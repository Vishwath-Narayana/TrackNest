// controllers/dashboardController.js
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const Deliverable = require('../models/Deliverable');
const Update = require('../models/Update');
const Client = require('../models/Client');
const User = require('../models/User');

// Get Dashboard Overview Data
exports.getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    
    let filter = {};
    
    // Role-based filtering
    if (userRole === 'client') {
      // Get client's projects only
      const client = await Client.findOne({ contactEmail: req.user.email });
      if (client) {
        filter.clientId = client._id;
      } else {
        return res.json({
          metrics: { totalActiveProjects: 0, openTickets: 0, pendingDeliverables: 0, upcomingDeadlines: 0 },
          projectStatus: { completed: 0, inProgress: 0, active: 0 },
          deliverablesProgress: { completed: 0, inProgress: 0, pending: 0 }
        });
      }
    }

    // Get metrics
    const totalActiveProjects = await Project.countDocuments({ 
      ...filter, 
      status: { $in: ['active', 'in progress'] } 
    });
    
    const openTickets = await Ticket.countDocuments({ 
      status: { $in: ['new', 'in progress'] },
      ...(userRole === 'client' && filter.clientId ? { 
        projectId: { $in: await getProjectIds(filter.clientId) } 
      } : {})
    });
    
    const pendingDeliverables = await Deliverable.countDocuments({ 
      status: { $in: ['pending', 'in progress'] },
      ...(userRole === 'client' && filter.clientId ? { 
        projectId: { $in: await getProjectIds(filter.clientId) } 
      } : {})
    });
    
    // Get upcoming deadlines (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const upcomingDeadlines = await Deliverable.countDocuments({
      dueDate: { $gte: new Date(), $lte: nextWeek },
      status: { $ne: 'completed' },
      ...(userRole === 'client' && filter.clientId ? { 
        projectId: { $in: await getProjectIds(filter.clientId) } 
      } : {})
    });

    // Project status breakdown
    const projectStatusData = await Project.aggregate([
      { $match: filter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Deliverables progress breakdown
    const deliverablesProgressData = await Deliverable.aggregate([
      ...(userRole === 'client' && filter.clientId ? [
        { $lookup: { from: 'projects', localField: 'projectId', foreignField: '_id', as: 'project' } },
        { $match: { 'project.clientId': filter.clientId } }
      ] : []),
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Format status data
    const formatStatusData = (data) => {
      const result = { completed: 0, inProgress: 0, active: 0, pending: 0 };
      data.forEach(item => {
        switch(item._id) {
          case 'completed': result.completed = item.count; break;
          case 'in progress': result.inProgress = item.count; break;
          case 'active': result.active = item.count; break;
          case 'pending': result.pending = item.count; break;
        }
      });
      return result;
    };

    res.json({
      metrics: {
        totalActiveProjects,
        openTickets,
        pendingDeliverables,
        upcomingDeadlines
      },
      projectStatus: formatStatusData(projectStatusData),
      deliverablesProgress: formatStatusData(deliverablesProgressData)
    });

  } catch (err) {
    console.error('Dashboard overview error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Recent Activities
exports.getRecentActivities = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    const limit = parseInt(req.query.limit) || 10;

    let projectFilter = {};
    if (userRole === 'client') {
      const client = await Client.findOne({ contactEmail: req.user.email });
      if (client) {
        const projectIds = await Project.find({ clientId: client._id }).distinct('_id');
        projectFilter = { projectId: { $in: projectIds } };
      }
    }

    // Get recent updates
    const recentUpdates = await Update.find({
      ...(userRole === 'client' ? projectFilter : {})
    })
    .populate('createdBy', 'name')
    .populate('projectId', 'name')
    .sort({ createdAt: -1 })
    .limit(limit);

    // Get recent tickets
    const recentTickets = await Ticket.find({
      ...(userRole === 'client' ? projectFilter : {}),
      updatedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    })
    .populate('projectId', 'name')
    .sort({ updatedAt: -1 })
    .limit(limit);

    // Combine and format activities
    const activities = [];

    recentUpdates.forEach(update => {
      activities.push({
        id: update._id,
        type: 'update',
        title: update.title,
        project: update.projectId?.name,
        time: update.createdAt,
        user: update.createdBy?.name
      });
    });

    recentTickets.forEach(ticket => {
      activities.push({
        id: ticket._id,
        type: 'ticket',
        title: `Ticket: ${ticket.title}`,
        project: ticket.projectId?.name,
        time: ticket.updatedAt,
        status: ticket.status
      });
    });

    // Sort by time and limit
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    res.json(activities.slice(0, limit));

  } catch (err) {
    console.error('Recent activities error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Ticket Trends (for chart)
exports.getTicketTrends = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const userRole = req.user.role;

    let matchFilter = {
      createdAt: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
    };

    if (userRole === 'client') {
      const client = await Client.findOne({ contactEmail: req.user.email });
      if (client) {
        const projectIds = await Project.find({ clientId: client._id }).distinct('_id');
        matchFilter.projectId = { $in: projectIds };
      }
    }

    const ticketTrends = await Ticket.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            week: { $week: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.week': 1 } }
    ]);

    // Format for chart
    const formattedData = ticketTrends.map((item, index) => ({
      week: `Week ${index + 1}`,
      tickets: item.count
    }));

    res.json(formattedData);

  } catch (err) {
    console.error('Ticket trends error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Documents & Deliverables for table
exports.getDeliverablesList = async (req, res) => {
  try {
    const userRole = req.user.role;
    const { page = 1, limit = 10, status } = req.query;

    let filter = {};
    if (status) filter.status = status;

    if (userRole === 'client') {
      const client = await Client.findOne({ contactEmail: req.user.email });
      if (client) {
        const projectIds = await Project.find({ clientId: client._id }).distinct('_id');
        filter.projectId = { $in: projectIds };
      }
    }

    const skip = (page - 1) * limit;

    const deliverables = await Deliverable.find(filter)
      .populate('projectId', 'name')
      .populate('owner', 'name')
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip(skip);

    const total = await Deliverable.countDocuments(filter);

    const formattedDeliverables = deliverables.map(item => ({
      id: item._id,
      name: item.title,
      type: 'Document', // You can enhance this based on file type
      status: item.status,
      lastUpdated: item.updatedAt.toISOString().split('T')[0],
      project: item.projectId?.name,
      owner: item.owner?.name
    }));

    res.json({
      deliverables: formattedDeliverables,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error('Deliverables list error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Helper function
const getProjectIds = async (clientId) => {
  const projects = await Project.find({ clientId }).distinct('_id');
  return projects;
};

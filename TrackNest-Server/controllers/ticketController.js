// controllers/ticketController.js
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const { projectId, title, description, priority } = req.body;
    const createdBy = req.user.userId;

    const ticket = new Ticket({
      projectId,
      createdBy,
      title,
      description,
      priority: priority || 'medium',
      status: 'new'
    });

    await ticket.save();

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('projectId', 'name')
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: populatedTicket
    });

  } catch (err) {
    console.error('Create ticket error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Tickets
exports.getTickets = async (req, res) => {
  try {
    const { status, priority, projectId, page = 1, limit = 10 } = req.query;
    const userRole = req.user.role;
    
    let filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (projectId) filter.projectId = projectId;

    // Role-based filtering
    if (userRole === 'client') {
      const client = await Client.findOne({ contactEmail: req.user.email });
      if (client) {
        const projectIds = await Project.find({ clientId: client._id }).distinct('_id');
        filter.projectId = { $in: projectIds };
      }
    }

    const skip = (page - 1) * limit;

    const tickets = await Ticket.find(filter)
      .populate('projectId', 'name')
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip);

    const total = await Ticket.countDocuments(filter);

    res.json({
      tickets,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error('Get tickets error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

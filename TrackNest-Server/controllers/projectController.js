const Project = require('../models/Project');
const Client = require('../models/Client');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { clientId, name, description, status, priority, startDate, endDate, teamMembers } = req.body;
    
    // Input validation
    if (!clientId || !name) {
      return res.status(400).json({ message: 'Client ID and project name are required' });
    }

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Create project
    const project = new Project(req.body);
    await project.save();

    // Update client's projects array
    await Client.findByIdAndUpdate(
      clientId, 
      { $push: { projects: project._id } },
      { new: true }
    );

    // Populate the created project for response
    const populatedProject = await Project.findById(project._id)
      .populate('clientId', 'companyName contactPerson')
      .populate('teamMembers', 'name email role');

    res.status(201).json({
      message: 'Project created successfully',
      project: populatedProject
    });

  } catch (err) {
    console.error('Create project error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const { clientId, status, priority, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    // Apply filters
    if (clientId) filter.clientId = clientId;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Role-based filtering
    if (req.user.role === 'client') {
      // Clients can only see their own projects
      const userClients = await Client.find({ contactEmail: req.user.email });
      if (userClients.length > 0) {
        filter.clientId = { $in: userClients.map(client => client._id) };
      } else {
        return res.json({ projects: [], total: 0, page, limit });
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get projects with pagination
    const projects = await Project.find(filter)
      .populate('clientId', 'companyName contactPerson contactEmail')
      .populate('teamMembers', 'name email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip);

    // Get total count for pagination
    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error('Get projects error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate('clientId', 'companyName contactPerson contactEmail phone address')
      .populate('teamMembers', 'name email role')
      .populate('deliverables');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Role-based access control
    if (req.user.role === 'client') {
      const client = await Client.findById(project.clientId._id);
      if (client.contactEmail !== req.user.email) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    res.json(project);

  } catch (err) {
    console.error('Get project error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Role-based access control
    if (req.user.role === 'client') {
      return res.status(403).json({ message: 'Clients cannot update projects' });
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    .populate('clientId', 'companyName contactPerson')
    .populate('teamMembers', 'name email role');

    res.json({
      message: 'Project updated successfully',
      project: updatedProject
    });

  } catch (err) {
    console.error('Update project error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admins can delete projects
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete projects' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove project from client's projects array
    await Client.findByIdAndUpdate(
      project.clientId,
      { $pull: { projects: project._id } }
    );

    // Delete the project
    await Project.findByIdAndDelete(id);

    res.json({ message: 'Project deleted successfully' });

  } catch (err) {
    console.error('Delete project error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Projects by Client
exports.getProjectsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const projects = await Project.find({ clientId })
      .populate('teamMembers', 'name email role')
      .sort({ createdAt: -1 });

    res.json({
      client: {
        id: client._id,
        companyName: client.companyName,
        contactPerson: client.contactPerson
      },
      projects
    });

  } catch (err) {
    console.error('Get projects by client error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Project Statistics
exports.getProjectStats = async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Project.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalProjects = await Project.countDocuments();

    res.json({
      totalProjects,
      statusBreakdown: stats,
      priorityBreakdown: priorityStats
    });const Project = require('../models/Project');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
  try {
    const { clientId, status } = req.query;
    const filter = {};
    if (clientId) filter.clientId = clientId;
    if (status) filter.status = status;
    const projects = await Project.find(filter)
      .populate('clientId', 'companyName')
      .populate('teamMembers', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


  } catch (err) {
    console.error('Get project stats error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

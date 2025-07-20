// controllers/deliverableController.js
const Deliverable = require('../models/Deliverable');
const Project = require('../models/Project');

// Create Deliverable
exports.createDeliverable = async (req, res) => {
  try {
    const { projectId, title, description, owner, dueDate } = req.body;

    // Validate project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const deliverable = new Deliverable({
      projectId,
      title,
      description,
      owner,
      dueDate,
      status: 'pending'
    });

    await deliverable.save();

    // Update project's deliverables array
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { deliverables: deliverable._id } }
    );

    const populatedDeliverable = await Deliverable.findById(deliverable._id)
      .populate('projectId', 'name')
      .populate('owner', 'name email');

    res.status(201).json({
      message: 'Deliverable created successfully',
      deliverable: populatedDeliverable
    });

  } catch (err) {
    console.error('Create deliverable error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Deliverable
exports.updateDeliverable = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const deliverable = await Deliverable.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    .populate('projectId', 'name')
    .populate('owner', 'name email');

    if (!deliverable) {
      return res.status(404).json({ message: 'Deliverable not found' });
    }

    res.json({
      message: 'Deliverable updated successfully',
      deliverable
    });

  } catch (err) {
    console.error('Update deliverable error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Deliverables by Project
exports.getDeliverablesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const deliverables = await Deliverable.find({ projectId })
      .populate('owner', 'name email')
      .sort({ dueDate: 1 });

    res.json(deliverables);

  } catch (err) {
    console.error('Get deliverables by project error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

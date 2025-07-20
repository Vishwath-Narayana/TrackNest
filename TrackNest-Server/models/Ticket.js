const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['new', 'in progress', 'resolved', 'closed'], default: 'new' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['active', 'completed', 'on hold'], default: 'active' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  startDate: Date,
  endDate: Date,
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  deliverables: [{ type: Schema.Types.ObjectId, ref: 'Deliverable' }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

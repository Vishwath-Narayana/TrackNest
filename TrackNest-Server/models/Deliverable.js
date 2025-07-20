const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliverableSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  dueDate: Date,
  attachments: [String], // File URLs
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Deliverable', deliverableSchema);

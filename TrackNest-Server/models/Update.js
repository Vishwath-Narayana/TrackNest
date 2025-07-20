const mongoose = require('mongoose');
const { Schema } = mongoose;

const updateSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', default: null }, // null for global
  title: String,
  content: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Update', updateSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactEmail: { type: String, required: true },
  phone: String,
  address: String,
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);

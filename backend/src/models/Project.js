const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['residential', 'commercial', 'industrial', 'interior', 'urban', 'renovation'],
  },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String },
  }],
  coverImage: {
    url: { type: String },
    publicId: { type: String },
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  client: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'concept'],
    default: 'completed',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
}, { timestamps: true });

projectSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);

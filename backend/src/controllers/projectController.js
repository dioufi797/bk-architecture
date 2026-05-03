const Project = require('../models/Project');
const path = require('path');
const fs = require('fs');

exports.getProjects = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 12, sort = '-createdAt' } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (featured === 'true') filter.featured = true;

    const skip = (Number(page) - 1) * Number(limit);
    const [projects, total] = await Promise.all([
      Project.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Project.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, category, date, client, location, area, status, featured, tags } = req.body;

    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${file.filename}`,
          publicId: file.filename,
        });
      });
    }

    const coverImage = images.length > 0 ? images[0] : undefined;

    const project = await Project.create({
      title, description, category, date, client, location, area,
      status: status || 'completed',
      featured: featured === 'true' || featured === true,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      images,
      coverImage,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const { title, description, category, date, client, location, area, status, featured, tags, existingImages } = req.body;

    let images = [];

    if (existingImages) {
      const existing = Array.isArray(existingImages) ? existingImages : JSON.parse(existingImages);
      images = existing;
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({
          url: `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${file.filename}`,
          publicId: file.filename,
        });
      });
    }

    const coverImage = images.length > 0 ? images[0] : project.coverImage;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title, description, category, date, client, location, area,
        status: status || project.status,
        featured: featured !== undefined ? (featured === 'true' || featured === true) : project.featured,
        tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : project.tags,
        images,
        coverImage,
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.images.forEach((img) => {
      if (img.publicId) {
        const filePath = path.join(__dirname, '../../uploads', img.publicId);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });

    await project.deleteOne();
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [total, byCategory] = await Promise.all([
      Project.countDocuments(),
      Project.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);
    res.json({ success: true, data: { total, byCategory } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

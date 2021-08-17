const mongoose = require('../db');
const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true
  }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
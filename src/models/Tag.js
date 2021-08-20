const mongoose = require('../db');
const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  collation: { locale: 'pt', strength: 2 }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
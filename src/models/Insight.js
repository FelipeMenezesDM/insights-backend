const mongoose = require('../db');
const Tag = require('./Tag');
const InsightSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
    trim: true
  },
  tags: [Tag.schema]
}, {
  timestamps: {
    createdAt: 'data_criacao',
    updatedAt: 'data_alteracao'
  }
});

const Insight = mongoose.model('Insight', InsightSchema);

module.exports = Insight;
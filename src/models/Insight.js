const mongoose = require('../db');
const InsightSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: {
    createdAt: 'data_criacao',
    updatedAt: 'data_alteracao'
  }
});

const Insight = mongoose.model('Insight', InsightSchema);

module.exports = Insight;
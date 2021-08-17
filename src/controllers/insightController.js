const express = require('express');
const Insight = require('../models/Insight');
const router = express.Router();

router.post('/post', async (req, res) => {
  try{
    const insight = await Insight.create(req.body);
    return res.send({ insight });
  }catch(err){
    return res.status(400).send({ error: 'Falha de inserção do card.' });
  }
});

router.get('/get', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID do card não informado.' });
    }

    const insight = await Insight.findById(req.body.id);
    return res.send({ insight });
  }catch(err){
    return res.status(400).send({ error: 'Falha na leitura do card.' });
  }
});

router.put('/put', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID do card não informado.' });
    }

    const insight = await Insight.findByIdAndUpdate(req.body.id, req.body);
    return res.send({ insight });
  }catch(err){
    console.log(err);
    return res.status(400).send({ error: 'Falha de atualização do card.' });
  }
});

router.delete('/delete', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID do card não informado.' });
    }

    const insight = await Insight.findByIdAndDelete(req.body.id);
    return res.send({ insight });
  }catch(err){
    console.log(err);
    return res.status(400).send({ error: 'Falha na remoção do card.' });
  }
});

module.exports = app => app.use('/insight', router);
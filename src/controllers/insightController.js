const express = require('express');
const cors = require('cors');
const Insight = require('../models/Insight');
const Tag = require('../models/Tag');
const router = express();
const regsPerPage = 5;
const insertTags = async tags => {
  const newTags= [];

  for(tagItem of tags) {
    let tag = await Tag.findOne({name: tagItem.name});

    if(!tag) {
      tag = new Tag(tagItem);
      tag.isNew = true;
      tag.save();
    }
    
    newTags.push(tag);
  }

  return newTags;
};

router.use(cors())

router.use((req, res, next) => {
  router.use(cors());
  next();
});

router.post('/post', async (req, res) => {
  try{
    const insight = await Insight.create(req.body);

    if(insight.tags && insight.tags.length) {
      console.log('--------------------------------');
      console.log(insight.tags);
      insight.tags = await insertTags(insight.tags);
      insight.save((err, result) => {
        return res.send({ result });
      });
    }
  }catch(err){
    console.log(err);
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

router.get('/search', async (req, res) => {
  try{
    await Insight.find({
      texto: {$regex: new RegExp(req.body.s), $options: 'i'}
    }, (err, insight) => {
      return res.send({ insight });
    }).sort({data_criacao: -1}).limit(regsPerPage);
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de cards.' });
  }
});

router.get('/list', async (req, res) => {
  try{
    await Insight.find({}, (err, insight) => {
      return res.send({ insight });
    }).sort({data_criacao: -1}).limit(regsPerPage);
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de cards.' });
  }
});

router.put('/put', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID do card não informado.' });
    }

    const insight = await Insight.findByIdAndUpdate(req.body.id, req.body, {new: true});

    insight.tags = await insertTags(insight.tags);
    insight.save((err, result) => {
      return res.send({ result });
    });
  }catch(err){
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
    return res.status(400).send({ error: 'Falha na remoção do card.' });
  }
});

module.exports = app => app.use('/insight', router);
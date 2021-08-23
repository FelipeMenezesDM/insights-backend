const Insight = require('../models/Insight');
const Tag = require('../models/Tag');
const router = require('express').Router();
const regsPerPage = 10;

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

router.post('/post', async (req, res) => {
  try{
    const insight = await Insight.create(req.body);

    if(insight.tags && insight.tags.length) {
      insight.tags = await insertTags(insight.tags);
      insight.save((err, result) => {
        return res.send({ result });
      });
    }else{
      return res.send({insight});
    }
  }catch(err){
    return res.status(400).send({ error: 'Falha de inserção do insight.' });
  }
});

router.get('/get', async (req, res) => {
  try{
    if(!req.query.id) {
      return res.status(400).send({ error: 'ID do insight não informado.' });
    }

    const insight = await Insight.findById(req.query.id);

    return res.send({ insight });
  }catch(err){
    return res.status(400).send({ error: 'Falha na leitura do insight.' });
  }
});

router.get('/search', async (req, res) => {
  try{
    const page = req.query.page || 0;

    await Insight.find({ $or: [
      {texto: {$regex: new RegExp(req.query.s), $options: 'i'}},
      {'tags.name': req.query.s}
    ]}).limit(regsPerPage).skip(page * regsPerPage).sort({data_criacao: 'desc'}).exec((err, insight) => {
      return res.send({ insight });
    });
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de insights.' });
  }
});

router.get('/list', async (req, res) => {
  try{
    const page = req.query.page || 0;

    await Insight.find({}).limit(regsPerPage).skip(page * regsPerPage).sort({data_criacao: 'desc'}).exec((err, insight) => {
      return res.send({ insight });
    });
  }catch(err){
    console.log(err);
    return res.status(400).send({ error: 'Falha na listagem de insights.' });
  }
});

router.put('/put', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID do insight não informado.' });
    }

    const insight = await Insight.findByIdAndUpdate(req.body.id, req.body, {new: true});

    if(insight.tags && insight.tags.length) {
      insight.tags = await insertTags(insight.tags);
      insight.save((err, result) => {
        return res.send({ result });
      });
    }else{
      return res.send({insight});
    }
  }catch(err){
    return res.status(400).send({ error: 'Falha de atualização do insight.' });
  }
});

router.delete('/delete', async (req, res) => {
  try{
    if(!req.query.id) {
      return res.status(400).send({ error: 'ID do insight não informado.' });
    }

    const insight = await Insight.findByIdAndDelete(req.query.id);

    return res.send({ insight });
  }catch(err){
    return res.status(400).send({ error: 'Falha na remoção do insight.' });
  }
});

module.exports = app => app.use('/insight', router);
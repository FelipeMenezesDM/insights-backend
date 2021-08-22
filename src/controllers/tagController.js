const Tag = require('../models/Tag');
const router = require('express').Router();

router.post('/post', async (req, res) => {
  try{
    const condition = {name: req.body.name};
    const options = {new: true, upsert: true, setDefaultsOnInsert: true};
    const data = req.body;
    const tag = await Tag.findOneAndUpdate(condition, data, options);

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha de inserção da tag.' });
  }
});

router.get('/get', async (req, res) => {
  try{
    if(!req.query.name) {
      return res.status(400).send({ error: 'Nome da tag não informado.' });
    }

    const tag = await Tag.findOne({name: req.query.name});

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha na leitura do card.' });
  }
});

router.get('/list', async (req, res) => {
  try{
    await Tag.find({}, (err, tags) => {
      return res.send({ tags });
    });
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de tags.' });
  }
});

router.get('/search', async (req, res) => {
  try{
    await Tag.find({
      name: {$regex: new RegExp(req.query.s), $options: 'i'}
    }, (err, tag) => {
      return res.send({ tag });
    });
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de cards.' });
  }
});

router.put('/put', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID da tag não informado.' });
    }

    const tagExists = await Tag.findOne({name: req.body.name});

    if(tagExists && tagExists.id != req.body.id) {
      return res.status(400).send({error: 'O novo nome informado para a tag já está em uso.'});
    }

    const tag = await Tag.findByIdAndUpdate(req.body.id, req.body, {new: true});

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha na atualização da tag.' });
  }
});

router.delete('/delete', async (req, res) => {
  try{
    if(!req.body.name) {
      return res.status(400).send({ error: 'Nome da tag não informado.' });
    }

    const tag = await Tag.findOneAndDelete({name: req.body.name});

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha na remoção da tag.' });
  }
});

module.exports = app => app.use('/tag', router);
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

/**
 * @swagger
 * /insight/post:
 *  post:
 *    summary: Cadastrar novo insight.
 *    tags:
 *      - Insight
 *    description: Cadastrar novo insight.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Insight'
 *    responses:
 *      200:
 *        description: Insight inserido com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Insight'
 *      400:
 *        description: Falha de inserção do insight.
 */
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

/**
 * @swagger
 * /insight/get:
 *  get:
 *    summary: Obter informações do Insight.
 *    tags:
 *      - Insight
 *    description: Obter informações do Insight.
 *    parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        description: Chave de identificação do Insight.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A consulta retornou resultado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Insight'
 *      400:
 *        description: Falha na leitura do insight.
 */
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

/**
 * @swagger
 * /insight/search:
 *  get:
 *    summary: Pesquisar Insights pelo texto ou por categoria.
 *    tags:
 *      - Insight
 *    description: Pesquisar Insights pelo texto ou por categoria.
 *    parameters:
 *      - in: query
 *        name: s
 *        required: true
 *        description: Trecho contido mo texto do Insight ou nome da categoria.
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        required: true
 *        description: Número da página para exibição dos resultados. (inicia com 0).
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: A consulta retornou resultados.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Insight'
 *      400:
 *        description: Falha na listagem de insights.
 */
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

/**
 * @swagger
 * /insight/list:
 *  get:
 *    summary: Listar todos os insights da base.
 *    tags:
 *      - Insight
 *    description: Listar todos os insights da base.
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        description: Número da página para exibição dos resultados. (inicia com 0).
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: A consulta retornou resultados.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Insight'
 *      400:
 *        description: Falha na listagem de insights.
 */
router.get('/list', async (req, res) => {
  try{
    const page = req.query.page || 0;

    await Insight.find({}).limit(regsPerPage).skip(page * regsPerPage).sort({data_criacao: 'desc'}).exec((err, insight) => {
      return res.send({ insight });
    });
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de insights.' });
  }
});

/**
 * @swagger
 * /insight/put:
 *  put:
 *    summary: Atualizar informações do Insight.
 *    tags:
 *      - Insight
 *    description: Atualizar informações do Insight.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Insight'
 *    responses:
 *      200:
 *        description: O Insight foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Insight'
 *      400:
 *        description: Falha de atualização do Insight.
 */
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

/**
 * @swagger
 * /insight/delete:
 *  delete:
 *    summary: Remover Insight da base.
 *    tags:
 *      - Insight
 *    description: Remover Insight da base.
 *    parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        description: Chave de identificação do Insight.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Insight removido com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Insight'
 *      400:
 *        description: Falha na remoção do insight.
 */
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
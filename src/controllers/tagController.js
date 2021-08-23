const Tag = require('../models/Tag');
const router = require('express').Router();

/**
 * @swagger
 * /tag/post:
 *  post:
 *    summary: Cadastrar nova tag.
 *    tags:
 *      - Tag
 *    description: Cadastrar nova tag.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Tag'
 *    responses:
 *      200:
 *        description: Tag inserida com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Tag'
 *      400:
 *        description: Falha de inserção da tag.
 */
router.post('/post', async (req, res) => {
  try{
    const condition = {name: req.body.name};
    const options = {new: true, upsert: true, setDefaultsOnInsert: true};
    const data = req.body;
    const tag = await Tag.findOneAndUpdate(condition, data, options);

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha de inserção da categoria.' });
  }
});

/**
 * @swagger
 * /tag/get:
 *  get:
 *    summary: Obter informações da categoria.
 *    tags:
 *      - Tag
 *    description: Obter informações da categoria.
 *    parameters:
 *      - in: query
 *        name: name
 *        required: true
 *        description: Nome da categoria.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A consulta retornou resultado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Tag'
 *      400:
 *        description: Falha na leitura da dacategoria.
 */
router.get('/get', async (req, res) => {
  try{
    if(!req.query.name) {
      return res.status(400).send({ error: 'Nome da categoria não informado.' });
    }

    const tag = await Tag.findOne({name: req.query.name});

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha na leitura da categoria.' });
  }
});

/**
 * @swagger
 * /tag/list:
 *  get:
 *    summary: Listar todas as categorias da base.
 *    tags:
 *      - Tag
 *    description: Listar todas as categorias da base.
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
 *                $ref: '#components/schemas/Tag'
 *      400:
 *        description: Falha na listagem de categorias.
 */
router.get('/list', async (req, res) => {
  try{
    await Tag.find({}, (err, tags) => {
      return res.send({ tags });
    });
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de categorias.' });
  }
});

/**
 * @swagger
 * /tag/search:
 *  get:
 *    summary: Pesquisar categorias pelo nome.
 *    tags:
 *      - Tag
 *    description: Pesquisar categorias pelo nome.
 *    parameters:
 *      - in: query
 *        name: s
 *        required: true
 *        description: Nome da categoria para busca.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A consulta retornou resultados.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Tag'
 *      400:
 *        description: Falha na listagem de categorias.
 */
router.get('/search', async (req, res) => {
  try{
    await Tag.find({
      name: {$regex: new RegExp(req.query.s), $options: 'i'}
    }, (err, tag) => {
      return res.send({ tag });
    });
  }catch(err){
    return res.status(400).send({ error: 'Falha na listagem de categorias.' });
  }
});

/**
 * @swagger
 * /tag/put:
 *  put:
 *    summary: Atualizar informações da categoria.
 *    tags:
 *      - Tag
 *    description: Atualizar informações da categoria.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Tag'
 *    responses:
 *      200:
 *        description: A categoria foi atualizada com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Tag'
 *      400:
 *        description: Falha de atualização da categoria.
 */
router.put('/put', async (req, res) => {
  try{
    if(!req.body.id) {
      return res.status(400).send({ error: 'ID da categoria não informado.' });
    }

    const tagExists = await Tag.findOne({name: req.body.name});

    if(tagExists && tagExists.id != req.body.id) {
      return res.status(400).send({error: 'O novo nome informado para a categoria já está em uso.'});
    }

    const tag = await Tag.findByIdAndUpdate(req.body.id, req.body, {new: true});

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha na atualização da categoria.' });
  }
});

/**
 * @swagger
 * /tag/delete:
 *  delete:
 *    summary: Remover categoria da base.
 *    tags:
 *      - Tag
 *    description: Remover categoria da base.
 *    parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        description: Chave de identificação da categoria.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Categoria removida com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#components/schemas/Tag'
 *      400:
 *        description: Falha na remoção da categoria.
 */
router.delete('/delete', async (req, res) => {
  try{
    if(!req.query.name) {
      return res.status(400).send({ error: 'Nome da categoria não informado.' });
    }

    const tag = await Tag.findOneAndDelete({name: req.query.name});

    return res.send({ tag });
  }catch(err){
    return res.status(400).send({ error: 'Falha na remoção da categoria.' });
  }
});

module.exports = app => app.use('/tag', router);
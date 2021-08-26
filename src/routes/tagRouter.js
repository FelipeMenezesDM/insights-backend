const router = require('express').Router();
const TagController = require('../controllers/tagController');

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
router.post('/post', TagController.postTag);

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
router.get('/get', TagController.getTag);

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
router.get('/list', TagController.listTag);

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
router.get('/search', TagController.searchTag);

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
router.put('/put', TagController.putTag);

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
router.delete('/delete', TagController.deleteTag);

module.exports = app => app.use('/tag', router);
const router = require('express').Router();
const InsightController = require('../controllers/insightController');

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
router.post('/post', InsightController.postInsight);

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
router.get('/get', InsightController.getInsight);

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
router.get('/search', InsightController.searchInsight);

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
router.get('/list', InsightController.listInsight);

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
router.put('/put', InsightController.putInsight);

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
router.delete('/delete', InsightController.deleteInsight);

module.exports = app => app.use('/insight', router);
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Insights',
      description: 'API principal do Insights',
      version: '1.0.0'
    },
    servers: [{
      description: 'Desenvolvimento',
      url: 'http://localhost:3000/'
    }],
    tags: [
      {
        name: 'Insight',
        description: 'Controle de insights'
      },
      {
        name: 'Tag',
        description: 'Controle de tags'
      }
    ],
    components: {
      schemas: {
        Insight: {
          type: 'object',
          properties: {
            texto: {
              type: 'string',
              example: 'Teste'
            },
            tags: {
              type: 'array',
              items: {
                $ref: '#components/schemas/Tag'
              }
            }
          },
          required: ['texto']
        },
        Tag: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Teste'
            }
          },
          required: ['name']
        }
      }
    }
  },
  apis: ['src/controllers/insightController.js', 'src/controllers/tagController.js']
};

const swagger = swaggerJsDoc(options);
module.exports = swagger;

const swagger = require('swagger-autogen')();
const output = 'src/docs/api.schema.json';
const routes = ['src/controllers/insightController.js', 'src/controllers/tagController.js',];

const doc = {
  info: {
    version: '1.0.0',
    title: 'API do Insights',
    description: 'API principal do Insights'
  },
  host: 'localhost:3000',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Insight',
      description: 'Endpoints'
    },
    {
      name: 'Tag',
      description: 'Endpoints'
    }
  ]
};

swagger(output, routes, doc);

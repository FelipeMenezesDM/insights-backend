const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const apiSchema = require('./swagger');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
  app.use(cors());
  next();
});

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(apiSchema));

require('./routes')(app);

app.listen(3000);
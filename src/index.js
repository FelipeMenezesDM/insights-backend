const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/insightController')(app);

app.listen(3000);
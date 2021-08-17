const express = require('express');
const Insight = require('../models/Insight');
const router = express.Router();

router.post('/post', async (req, res) => {
  try{
    const insight = await Insight.create(req.body);
    return res.send({ insight });
  }catch(err){
    return res.status(400).send({ error: 'Fail' });
  }
});

module.exports = app => app.use('/insight', router);
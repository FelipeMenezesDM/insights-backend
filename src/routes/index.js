module.exports = app => {
  require('./insightRouter')(app);
  require('./tagRouter')(app);
}
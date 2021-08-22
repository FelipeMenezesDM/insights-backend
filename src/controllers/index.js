module.exports = app => {
  require('./insightController')(app);
  require('./tagController')(app);
}
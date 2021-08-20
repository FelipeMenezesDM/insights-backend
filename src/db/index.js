const env = require('../../environment/init');
const mongoose = require('mongoose');

mongoose.connect(env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

mongoose.Promise = global.Promise;
module.exports = mongoose;
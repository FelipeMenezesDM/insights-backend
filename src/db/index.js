const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).catch(reason => {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
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
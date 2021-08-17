const mongoose = require('mongoose');

mongoose.connect('mongodb://root:mongo@localhost:9000', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true 
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
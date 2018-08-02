var mongoose= require('mongoose');

mongoose.Promise= global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');

var promise = mongoose.connect('mongodb://localhost/TodoApp', {
  useMongoClient: true,
  /* other options */
});


module.exports={mongoose: mongoose};
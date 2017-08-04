var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('todoApp:nodejsapp@ds161159.mlab.com:61159/nodejs-todo-app');


module.exports = {mongoose};

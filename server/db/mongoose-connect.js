var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('todoApp:nodejsapp@ds161159.mlab.com:61159/nodejs-todo-app');
//mongoose.connect('mongodb://localhost:27017/Todoapp');

module.exports = {mongoose};

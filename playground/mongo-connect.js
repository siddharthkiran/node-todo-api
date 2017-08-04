var mongoclient = require('mongodb').MongoClient;

mongoclient.connect('todoApp:nodejsapp@ds161159.mlab.com:61159/nodejs-todo-app', (err, db) => {
 if(err){
   return console.log('unable to connect to mongo db');
 }
 console.log('connected to mongo db server');

//  db.collection('Todos').insertOne({
// text: 'something to do',
// completed: false
//  }, (err, result) =>{
//    if(err){
//      return console.log('cannot insert');
//    }
//    console.log(JSON.stringify(result.ops,undefined,2));
//  });
//
//  db.collection('Users').insertOne({
//    name: 'siddharth',
//    age: 25,
//    location: 'dallas'
//  }, (err,result) =>{
//    if(err){
//      return console.log('cannot insert');
//    }
//    console.log(JSON.stringify(result.ops,undefined,2));
//  })
});

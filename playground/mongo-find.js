var mongoclient = require('mongodb').MongoClient;

mongoclient.connect('mongodb://localhost:27017/Todoapp', (err, db) => {
 if(err){
   return console.log('unable to connect to mongo db');
 }
 console.log('connected to mongo db server');

db.collection('Users').find().toArray().then((data)=> {
console.log(data);
}, (err) => {
  console.log('error');
})

});

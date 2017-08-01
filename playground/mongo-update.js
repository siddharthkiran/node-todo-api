var mongoclient = require('mongodb').MongoClient;
var {ObjectID} = require('mongodb');
mongoclient.connect('mongodb://localhost:27017/Todoapp', (err, db) => {
 if(err){
   return console.log('unable to connect to mongo db');
 }
 console.log('connected to mongo db server');

db.collection('Users').findOneAndUpdate(
  {name: 'ravi'},
  { $set:{name: 'sidd'} ,
    $inc:{age : 2}
  },
  {
    returnOriginal: false
  }
).then((data) =>{
  console.log(data);
})
});

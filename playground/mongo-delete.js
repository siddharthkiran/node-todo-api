var mongoclient = require('mongodb').MongoClient;
var {ObjectID} = require('mongodb');
mongoclient.connect('mongodb://localhost:27017/Todoapp', (err, db) => {
 if(err){
   return console.log('unable to connect to mongo db');
 }
 console.log('connected to mongo db server');

//deleteMany

// db.collection('Todos').deleteMany({text: 'something to do'}).then((success) =>{
//   console.log(success);
// })

//findOneAndDelete

// db.collection('Todos').findOneAndDelete({completed: "false"}).then((result) =>{
//   console.log(result);
// })

db.collection('Users').findOneAndDelete({_id : new ObjectID('5980d7610f06c48a13aafba2')}).then((res) =>{
  console.log(res);
})

});

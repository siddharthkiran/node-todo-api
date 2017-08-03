var {mongoose} = require('./../server/db/mongoose-connect');
var {User} = require('./../server/db/User');

// var user = new User({
//   email:'sidd@gmai.com'
// })
// user.save().then((data) =>{
//   console.log(data);
// })

var id= '5983948548006d22f4793b7e11';

User.findById(id).then((user) =>{
  console.log(JSON.stringify(user,undefined,2));
}).catch((err) =>{
  console.log(err);
});

var express = require('express');
var bodyParser= require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose-connect');
var {User} = require('./db/User');
var {Todo} = require('./db/Todo');
var {ObjectID} = require('mongodb');
var {authenticate}= require('./middleware/authenticate');
var app= express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',authenticate,  (req,res) =>{
var todo =  new Todo ({
  text: req.body.text,
  _creator: req.user._id
});
todo.save().then((data) =>{
  res.send(data);
}, (err)=>{
  res.status(400).send(err);
});
  //console.log(req.body);
})

//delete//////////////

app.delete('/todos/:id' ,authenticate, (req,res) =>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
    res.status(400).send();

  Todo.findOneAndRemove({
    _id:id,
    _creator: req.user._id
  }).then((data) =>{
     if(!data)
      res.status(404).send();

      res.status(200).send({data:data});

   }).catch((e) =>{
     res.status(400).send();
   })

});

app.patch('/todos/:id', authenticate, (req,res) =>{

  var id =  req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if(!ObjectID.isValid(id))
    res.status(400).send();

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt =new Date().getTime();
  }
  else{
    body.completedAt=null;
    body.completed=false;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator: req.user._id
  }, {
    $set: body,
  }, {new :true}).then((todo) =>{
    if(!todo)
      return res.status(404).send();

      res.send({todo});
  }).catch((e) =>{
    res.status(400).send
  })
});
app.post('/users/login', (req,res) =>{
  var body = _.pick(req.body, ['email','password']);

  User.findByCredentials(body.email,body.password).then((user) =>{
    if(!user)
    {
      return Promise.reject();
    }
    user.generateToken().then((token) =>{
        res.header('x-auth', token).send(user);
    });

  }).catch((e)=>{
    res.status(400).send();
  })
  //res.status(200).send(body);
});

app.post('/users', (req,res) =>{
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);

    user.save().then(() =>{
      return user.generateToken();

      //res.send(user);
    }).then((token) =>{
      res.header('x-auth', token).send(user);
    }).catch((e) =>{
      console.log('from here');
      res.status(400).send(e);
    })

});




app.get('/users/me',authenticate, (req,res) =>{

res.send(req.user);

});

app.delete('/users/me/logout',authenticate, (req, res) =>{
   var token = req.token;
   var user = req.user;
   user.removeToken(token).then(() =>{
     res.status(200).send();
   }).catch((e) =>{
     res.status(400).send();
   })
})

app.get('/todos',authenticate,(req,res) =>{
  Todo.find({
    _creator: req.user._id
  }).then((data) =>{
    res.status(200).send({data:data});
  }, (err) =>{
    res.status(400).send(err);
  })
});

app.get('/todos/:id', authenticate, (req,res) =>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findOne({
    _id:id,
    _creator: req.user._id
  }).then((data) =>{
    console.log(data);
    res.send(data);
  },(err) =>{
  console.log(err);
    res.status(400).send();

  }).catch((e)=>{
      console.log(err);
      res.status(404).send();
  });
});

app.listen(PORT, ()=>{
  console.log('server is up and running');
})

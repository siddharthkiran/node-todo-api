var express = require('express');
var bodyParser= require('body-parser');

var {mongoose} = require('./db/mongoose-connect');
var {User} = require('./db/User');
var {Todo} = require('./db/Todo');
var {ObjectID} = require('mongodb');
var app= express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) =>{
var todo =  new Todo ({
  text: req.body.text
});
todo.save().then((data) =>{
  res.send(data);
}, (err)=>{
  res.status(400).send(err);
});
  //console.log(req.body);
})

app.get('/todos',(req,res) =>{
  Todo.find().then((data) =>{
    res.status(200).send({data:data});
  }, (err) =>{
    res.status(400).send(err);
  })
});

app.get('/todos/:id', (req,res) =>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findById(id).then((data) =>{
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

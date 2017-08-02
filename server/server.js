var express = require('express');
var bodyParser= require('body-parser');

var {mongoose} = require('./db/mongoose-connect');
var {User} = require('./db/User');
var {Todo} = require('./db/Todo');

var app= express();

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

app.listen(3000, ()=>{
  console.log('server is up and running');
})

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var message = " hi ia m sidd"
var hash = SHA256(message).toString();

console.log(`${message} and hash ${hash}`);

var token =jwt.sign(message,'secret');
console.log(token);

var decoded= jwt.verify(token,'secret');
console.log(decoded);

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage}  = require('./utils/message');

const publicPath = path.join(__dirname,'../public');

console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
 console.log('New user connected');

 socket.emit('newMessage', generateMessage('admin','welcome to the chat app'));

 socket.broadcast.emit('newMessage', generateMessage('admin','new user joined'));

 socket.emit('newMessage', {
   from: 'andrew',
   text: 'see you then',
   createdAt: 123123
 });

 socket.on('createMessage', (message) => {
 	console.log('create message', message);
 	io.emit('newMessage', generateMessage(message.from, message.text));
 	// socket.broadcast.emit('newMessage', {
 	// 	from: message.from,
 	// 	text: message.text,
 	// 	createdAt: new Date().getTime() 		
 	// });
 });

 socket.on('disconnect', function(){
    console.log('User disconnected');
 });
});

server.listen(3000, function(){
  console.log('Server is up on port 3000');
});

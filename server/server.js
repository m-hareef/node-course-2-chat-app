//load built in module helping in setting paths especially when going one folder up
const path = require('path');  //built in module, no need to install
const http = require('http'); //built in module, used by express

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');  //as public path is one folder up and then the public folder
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//set root route to the public path
app.use(express.static(publicPath));


//Listen to a new connection
io.on('connection', (socket) => {
  console.log('New user connected');

  //Disconects
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });


  //receive event from client
  socket.on('createMessage', (message) => {
    console.log('createMessage',message);
    //Emit to all connected clients using io.emit
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

}); //closing brackets for listening to new connection

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

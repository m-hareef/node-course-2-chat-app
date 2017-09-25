var socket = io();

// When client connects to server
socket.on('connect', function ()  {
  console.log('Conneected to server');

  //Emit data to server on connected
  // socket.emit('createMessage', {
  //   to: 'rashdan@kgs.com',
  //   text: 'This is Rashdan'
  // });

});

// When  disconncted from server
socket.on('disconnect', function ()  {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
});

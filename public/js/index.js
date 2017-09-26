var socket = io();

// When client connects to server
socket.on('connect', function ()  {
  console.log('Connected to server');

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
  console.log('New Message **', message);
  var li = jQuery('<li></li>');  //create a html list tag
  li.text(`${message.from}: ${message.text}`); //fill the list with data

  jQuery('#messages').append(li); //append this list to the messages ordered list OL
});

//Acknowledgement of messages using callback function
// socket.emit('createMessage', {
//   from: 'Hareef',
//   text: 'Hi'
// }, function(data) {
//   console.log('Acknowledged messaged', data);
// })

//Button submit event
jQuery('#message-form').on('submit', function (e) {  //select the html form
  e.preventDefault(); //prevent form from submitting
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name = message]').val()
  }, function () {

  });
})

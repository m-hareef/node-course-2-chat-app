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



//listen to locationmessage
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');  //create a html list tag
  var a = jQuery('<a target="_blank">My current location</a>') //target = _blank to open target link on a new tab
  li.text(`${message.from}`); //fill the list with data
  a.attr('href', message.url); //add the href attrihute to the a element
  li.append(a); //append the message.from and message.url
  jQuery('#messages').append(li); //append this list to the messages ordered list OL
});

jQuery('#message-form').on('submit', function (e) {  //select the html form
  e.preventDefault(); //prevent form from submitting

  var messageTextbox = jQuery('[name=message]'); //select the textbox which has the name (id) message and store it in a variable
  socket.emit('createMessage', {
    from: 'User: ',
    text: messageTextbox.val()
  }, function () {
    //clear the textbox
    messageTextbox.val('')
  });
});

//Location button click
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {  //check if gerolocation is supported on browser
    return alert('Geolocation not supported on your browser');
  }
//Disable location button and change its text to sending location, once its clicked and enable after getting the result which takes 2-3 seconds
locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    //Enable location button
    locationButton.removeAttr('disabled').text('Send location'); //remove attribute disabled and make text back to send location
    //Emit to server which will then broadcast to all users
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});

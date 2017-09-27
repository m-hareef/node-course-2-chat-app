var socket = io();


//Function to Auto scroll
function scrollToBottom ()  {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');  //select the last child - which is the last list the user typed
  //Heights
  var clientHeight = messages.prop('clientHeight');  //prop = to fetch a property
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight(); //Height of the last message
  var lastMessageHeight = newMessage.prev().innerHeight(); //height of the second last message

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

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
  //using Mustache to create templates for displaying data
  var formattedTime = moment(message.createdAt).format('h:mm a'); //using the moment.js library for formatting date/time
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,  //the text is the variable the index.html file expects which we enclosed in {{}}
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html); //append this html to the messages ordered list OL
  scrollToBottom() // call function to scrollToBottom

  // var formattedTime = moment(message.createdAt).format('h:mm a'); //using the moment.js library for formatting date/time
  // var li = jQuery('<li></li>');  //create a html list tag
  // li.text(`${message.from} ${formattedTime}: ${message.text}`); //fill the list with data
  //
  // jQuery('#messages').append(li); //append this list to the messages ordered list OL
});



//listen to locationmessage
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a'); //using the moment.js library for formatting date/time
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,  //the url is the variable the index.html file expects which we enclosed in {{}}
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html); //append this html to the messages ordered list OL
  scrollToBottom() // call function to scrollToBottom

  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');  //create a html list tag
  // var a = jQuery('<a target="_blank">My current location</a>') //target = _blank to open target link on a new tab
  // li.text(`${message.from} ${formattedTime}: `); //fill the list with data
  // a.attr('href', message.url); //add the href attrihute to the a element
  // li.append(a); //append the message.from and message.url
  // jQuery('#messages').append(li); //append this list to the messages ordered list OL
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

var moment = require('moment');


//Generate a text message with given from and text as parameters
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt : moment().valueOf()
  };
};

//Generate a google maps url using coordinates as parameters
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: ` https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt : moment().valueOf()
  };
};



module.exports = {generateMessage, generateLocationMessage};

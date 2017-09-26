//Generate a text message with given from and text as parameters
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt : new Date().getTime()
  };
};

//Generate a google maps url using coordinates as parameters
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt : new Date().getTime()
  };
};



module.exports = {generateMessage, generateLocationMessage};

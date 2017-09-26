var moment = require('moment');

var date =  moment();
console.log(date.format('MMM Do YY hh:mm A'));
console.log('Rashdan, the time is ',date.format('h:mm a'));

console.log(moment().valueOf());

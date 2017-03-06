var moment = require('moment');
console.log(moment().format());

var now = moment();

console.log('Current timestamp',now.unix());

var timestamp = 1488813927;
var currentMoment = moment.unix(timestamp);
console.log('current moment', currentMoment.format('MMM D,YYYY @ hh:mm a'));

console.log('current moment', currentMoment.format('MMMM Do,YYYY @ hh:mm A'));
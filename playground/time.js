var moment = require('moment');

// Jan 1st 1970 00:00:10 am

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

var date = moment();
console.log(date.format('MMM Do YYYY'));
var _ = require('lodash');
var romanDigits = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
};

var toRoman = require('./toRoman')(romanDigits);
var fromRoman = require('./fromRoman')(romanDigits);

var self = function(input) {
  return (isNaN(parseInt(input)) ? fromRoman : toRoman)(input);
};

_.assign(self, {
  toRoman: toRoman,
  fromRoman: fromRoman
});

module.exports = self;


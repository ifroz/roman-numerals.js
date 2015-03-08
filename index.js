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

var fill = function(count, char) {
  return _.range(count).map(_.constant(char)).join('');
};

var getNumeral = function(n) {
  return numerals[n] || fill(n / 1000, 'M');
};

var digitToRoman = function(d, one, five, ten) {
  if (d <= 3) {
    return fill(d, one);
  } else if (d <= 5) {
    return fill(5 - d, one) + five;
  } else if (d <= 8) {
    return five + fill(d - 5, one);
  } else if (d <= 9) {
    return fill(10 - d, one) + ten;
  } else {
    throw new Error(d.toString() + ' is not a digit');
  }
};

var toRoman = function(n, magnitude) {
  magnitude = magnitude || 0;
  var multiplier = Math.pow(10, magnitude);
  return (Math.floor(n) > 9 ? toRoman(n / 10, magnitude + 1) : '') +
      digitToRoman(parseInt(Math.floor(n).toString().split('').pop()),
          getNumeral(multiplier),
          getNumeral(5 * multiplier),
          getNumeral(10 * multiplier));
};

module.exports = { toRoman: toRoman };
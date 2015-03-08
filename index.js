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
var romanDigitsMaxKey = _(romanDigits).keys().map(_.ary(parseInt, 1)).max();

var fill = function(count, char) {
  return _.range(count).map(_.constant(char)).join('');
};

var digitToRoman = function(d, places) {
  if (d === 0) {
    return '';
  } else if (d <= 3) {
    return fill(d, places[1]);
  } else if (d <= 5) {
    return fill(5 - d, places[1]) + places[5];
  } else if (d <= 8) {
    return places[5] + fill(d - 5, places[1]);
  } else if (d === 9) {
    return fill(10 - d, places[1]) + places[10];
  } else {
    throw new Error(d.toString() + ' is not a digit');
  }
};

var getPlacesForMultiplier = function(multiplier) {
  return {
    1: getNumeral(multiplier),
    5: getNumeral(5 * multiplier),
    10: getNumeral(10 * multiplier)
  };
};

var getNumeral = function(n) {
  return romanDigits[n] || '';
};

var getLastDigit = function(number) {
  return parseInt(Math.floor(number).toString().split('').pop());
};

var toInRangeRoman = function(n, magnitude) {
  magnitude = magnitude || 0;
  var multiplier = Math.pow(10, magnitude);
  return (Math.floor(n) > 9 ? toInRangeRoman(n / 10, magnitude + 1) : '') +
      digitToRoman(Math.floor(n) % 10, getPlacesForMultiplier(multiplier));
};

var romanOveragePrefix = function(n) {
  return fill(Math.floor(n / romanDigitsMaxKey),romanDigits[romanDigitsMaxKey]);
};

var toRoman = function(n) {
  return romanOveragePrefix(n) + toInRangeRoman(n % romanDigitsMaxKey);
};

var getRomanValues = function() {
  return _(romanDigits).invert().mapValues(_.ary(parseInt, 1)).value();
};

var fromRoman = function(r) {
  var romanValues = getRomanValues();
  var numbers = r.split('').map(function(char) { return romanValues[char]; });
  return _.reduce(_.map(numbers, function(v, idx) {
    return ((_.max(numbers.slice(idx)) > v) ? -1 : 1) * v;
  }), function(sum, num) {
    return sum + num;
  });
};

module.exports = function(input) {
  return isNaN(parseInt(input)) ? fromRoman(input) : toRoman(input);
};

_.assign(module.exports, {
  toRoman: toRoman,
  fromRoman: fromRoman,
  digitToRoman: digitToRoman
});
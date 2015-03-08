var _ = require('lodash');

var fill = function(count, char) {
  return _(count).range().fill(char).join('');
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
    throw new Error('"' + d.toString() + '" is not a digit');
  }
};

module.exports = function toRoman(romanDigits) {
  var maxDigitValue = _(romanDigits).keys().map(_.ary(parseInt, 1)).max();

  var toInRangeRoman = function(n, magnitude) {
    magnitude = magnitude || 0;
    var multiplier = Math.pow(10, magnitude);
    return (Math.floor(n) > 9 ? toInRangeRoman(n / 10, magnitude + 1) : '') +
        digitToRoman(Math.floor(n) % 10, getPlacesForMultiplier(multiplier));
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

  var romanOveragePrefix = function(n) {
    return fill(Math.floor(n / maxDigitValue), romanDigits[maxDigitValue]);
  };

  return function toRoman(n) {
    return romanOveragePrefix(n) + toInRangeRoman(n % maxDigitValue);
  };
};
var _ = require('lodash');

module.exports = function toRomanFactory(romanDigits) {
  var maxDigitValue = _(romanDigits).keys().map(_.ary(parseInt, 1)).max();

  var toRoman = function(n) {
    return romanOveragePrefix(n) + toInRangeRoman(n % maxDigitValue);
  };

  var romanOveragePrefix = function(n) {
    var fill = function(cnt, chr) { return _(cnt).range().fill(chr).join(''); };
    return fill(Math.floor(n / maxDigitValue), romanDigits[maxDigitValue]);
  };

  var toInRangeRoman = function(n, magnitude) {
    magnitude = magnitude || 0;
    return (Math.floor(n) > 9 ? toInRangeRoman(n / 10, magnitude + 1) : '') +
        digitToRoman(Math.floor(n) % 10, getPlaces(Math.pow(10, magnitude)));
  };

  var digitToRoman = function(d, places) {
    var ones = _.fill(_.range(9), places[1]);
    return ones.slice(0, d).join('').
        replace(ones.slice(0, 9).join(''), places[1] + places[10]).
        replace(ones.slice(0, 5).join(''), places[5]).
        replace(ones.slice(0, 4).join(''), places[1] + places[5]);
  };

  var getPlaces = function(multiplier) {
    var getNumeral = function(n) {
      return romanDigits[n] || '';
    };
    return {
      1: getNumeral(multiplier),
      5: getNumeral(5 * multiplier),
      10: getNumeral(10 * multiplier)
    };
  };

  return toRoman;
};
var _ = require('lodash');

var negateIfHasBiggerSuccessors = function(v, idx, whole) {
  return ((_.max(whole.slice(idx)) > v) ? -1 : 1) * v;
};

var summarize = function(sum, num) {
  return sum + num;
};

module.exports = function fromRomanFactory(romanDigits) {
  var digitValues = _(romanDigits).invert().mapValues(_.ary(parseInt, 1)).value();
  var romanCharAbsoluteValue = function(char) {
    return digitValues[char];
  };
  return function fromRoman(r) {
    return _(r.split('')).
        map(romanCharAbsoluteValue).
        map(negateIfHasBiggerSuccessors).
        reduce(summarize);
  };
};
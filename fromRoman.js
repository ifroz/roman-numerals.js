var _ = require('lodash');

var negateIfSucceededByBigger = function(v, idx, whole) {
  return ((_.max(whole.slice(idx)) > v) ? -1 : 1) * v;
};

var summarize = function(sum, num) {
  return sum + num;
};

var getRomanValues = function(romanDigits) {
  return _(romanDigits).invert().mapValues(_.ary(parseInt, 1)).value();
};

module.exports = function(romanDigits) {
  var romanValues = getRomanValues(romanDigits);
  var romanCharAbsoluteValue = function(char) {
    return romanValues[char];
  };

  return function fromRoman(r) {
    return _(r.split('')).
        map(romanCharAbsoluteValue).
        map(negateIfSucceededByBigger).
        reduce(summarize);
  };
};
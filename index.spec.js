var expect = require('chai').expect;
var toRoman = require('./index').toRoman;
var fromRoman = require('./index').fromRoman;
var _ =  require('lodash');
describe('romanNumerals', function() {
  describe('#toRoman', function() {
    it('should return some I-s for 1..3', function() {
      expect(toRoman(1)).to.equal('I');
      expect(toRoman(2)).to.equal('II');
      expect(toRoman(3)).to.equal('III');
    });

    it('should return IV..VIII for 4..8', function() {
      expect(toRoman(4)).to.equal('IV');
      expect(toRoman(5)).to.equal('V');
      expect(toRoman(6)).to.equal('VI');
      expect(toRoman(7)).to.equal('VII');
      expect(toRoman(8)).to.equal('VIII');
    });

    it('should return IX and X for 9', function() {
      expect(toRoman(9)).to.equal('IX');
    });

    it('should return X, XI for 10, 11 respectively', function() {
      expect(toRoman(10)).to.equal('X');
      expect(toRoman(11)).to.equal('XI');
    });

    it('should work for numbers < 1000', function() {
      expect(toRoman(200)).to.equal('CC');
      expect(toRoman(794)).to.equal('DCCXCIV');
      expect(toRoman(678)).to.equal('DCLXXVIII');
      expect(toRoman(999)).to.equal('CMXCIX');
    });

    it('should work for numbers < 5000', function() {
      expect(toRoman(2015)).to.equal('MMXV');
    });

    it('should work for numbers >= 5000', function() {
      expect(toRoman(9000)).to.equal('MMMMMMMMM');
      expect(toRoman(9999)).to.equal('MMMMMMMMMCMXCIX');
      expect(toRoman(5000)).to.equal('MMMMM');
      expect(toRoman(6000)).to.equal('MMMMMM');
      expect(toRoman(7000)).to.equal('MMMMMMM');
      expect(toRoman(8000)).to.equal('MMMMMMMM');
      expect(toRoman(18679)).to.equal('MMMMMMMMMMMMMMMMMMDCLXXIX');
    });
  });

  describe('#fromRoman', function() {
    it('should work digits which only has to be summarized', function() {
      expect(fromRoman('I')).to.equal(1);
      expect(fromRoman('III')).to.equal(3);
      expect(fromRoman('MCCCXXXVII')).to.equal(1337);
      expect(fromRoman('MMXV')).to.equal(2015);
    });

    it('should substact instead if larger value follows', function() {
      expect(fromRoman('IV')).to.equal(4);
      expect(fromRoman('CMXCIX')).to.equal(999);
    });
  });
});
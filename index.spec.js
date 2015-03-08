var expect = require('chai').expect;
var toRoman = require('./index').toRoman;

describe('romanNumerals', function() {
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

  it('should return IX and X for 9..10', function() {
    expect(toRoman(9)).to.equal('IX');
    expect(toRoman(10)).to.equal('X');
  });

  it('should return XI for 11', function() {
    expect(toRoman(11)).to.equal('XI');
  });

  it('should work for < 5000', function() {
    expect(toRoman(2015)).to.equal('MMXV');
  });

  it('should work for >= 5000', function() {
    expect(toRoman(5000)).to.equal('MMMMM');
    expect(toRoman(8679)).to.equal('MMMMMMMMDCLXXIX');
  });
});
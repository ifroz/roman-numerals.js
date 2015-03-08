# roman-numerals.js
Convert roman numerals back and forth.

Note that M is the greatest value here, so 5000 converts to MMMMM.

## Usage

```
var romanNumerals = require('./roman-numerals');

romanNumerals(2015) === 'MMXV'
romanNumerals('2015') === 'MMXV'
romanNumerals('MMXV') === 2015
```

## Tests

```mocha . ```

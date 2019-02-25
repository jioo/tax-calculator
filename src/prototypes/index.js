/**
 * 
 * Fixes `toFixed()` not rounding off
 * 
 * https://www.sitepoint.com/number-tofixed-rounding-errors-broken-but-fixable/
 * 
 */
(1.005).toFixed(2) == "1.01" || (function(prototype) {
  var toFixed = prototype.toFixed

  prototype.toFixed = function(fractionDigits) {
    var split = this.toString().split('.')
    var number = +(!split[1] ? split[0] : split.join('.') + '1')

    return toFixed.call(number, fractionDigits)
  }
}(Number.prototype));

/**
 * 
 * Formats a number with a specific number of digits (using `toFixed()`)
 * then convert it to Float
 * 
 * @param {number} digit The number of digits to appear after the decimal point.
 */
Number.prototype.toFixedFloat = function(digit) {
  let result = this.valueOf().toFixed(digit)
  return parseFloat(result)
};
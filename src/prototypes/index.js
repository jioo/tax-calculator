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
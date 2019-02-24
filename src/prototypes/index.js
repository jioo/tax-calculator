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

/**
 * 
 * Round off a number to nearest 100th
 * 
 * Usage:
 * 399984.toNearestHundredth() // returns 400000
 * 250004.toNearestHundredth() // returns 250000
 * 
 */
Number.prototype.toNearestHundredth = function () {

  const lastTwoDigit = this.valueOf() % 100

  if (lastTwoDigit > 50)
    return Math.ceil(this.valueOf() / 100) * 100

  return Math.floor(this.valueOf() / 100) * 100
}
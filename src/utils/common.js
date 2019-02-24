/**
 * 
 * Main formula for computing the tax
 * 
 * Note: Arrow function throws an error when using Self Reference Object (`this.taxableCompensation`)
 * 
 * @param {number} salary 
 */
export const computation = function (salary) {
  return this.taxableCompensation + ( (this.percentage / 100) * (salary - this.excessOver) ) 
}

/**
 * 
 * Apply computation based on the range of salary
 * 
 * @param {number} salary 
 * @param {array} table 
 */
export const computationFromTable = (salary, table) => {
  return table
    .filter(item => item.from < salary && item.to > salary)
    .map(item => {

      if (typeof item.computation === 'function')
        return item.computation(salary)

      return item.computation
    })[0]
}
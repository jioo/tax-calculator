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
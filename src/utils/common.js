import store from '@/store'

/**
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

/**
 * Dynamic salary converter
 * 
 * @param {string} period given salary period ['Annual', 'Month', 'Semi Month', 'Week', 'Day']
 * @param {Object} salary 
 */
export const convertSalary = (period, salary) => {
  let { annually, monthly, semiMonthly, weekly, daily } = salary
  const workingDaysPerWeek = store.getters.workingDaysPerWeek

  switch (period) {
    /**
     * Convert Annualy Salary to other salary period
     */
    case 'Annual':
      monthly = (annually / 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
      weekly = (annually / 52).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
    
    /**
     * Convert Monthly Salary to other salary period
     */
    case 'Month':
      annually = (monthly * 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
      weekly = (annually / 52).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
    
    /**
     * Convert Semi Monthly Salary to other salary period
     */
    case 'Semi Month':
      monthly = (semiMonthly * 2).toFixedFloat(2)
      annually = (monthly * 12).toFixedFloat(2)
      weekly = (annually / 52).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
    
    /**
     * Convert Weekly Salary to other salary period
     */
    case 'Week':
      monthly = ( (weekly * 52) / 12 ).toFixedFloat(2)
      annually = (monthly * 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
    
    /**
     * Convert Daily Salary to other salary period
     */
    default:
      weekly = (daily * workingDaysPerWeek).toFixedFloat(2)
      monthly = ((weekly * 52) / 12).toFixedFloat(2)
      annually = (monthly * 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
  }

  return {
    annually,
    monthly,
    semiMonthly,
    weekly,
    daily,
  }
}
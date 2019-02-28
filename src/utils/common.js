import store from '@/store'
import startCase from 'lodash.startcase'

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
 * Periodical number converter
 * 
 * - Annual = Monthly * 12 months
 * - Monthly = Annuall / 12 months
 * - Semi Monthly = Monthly / 2
 * - Weekly = Annual / 52 weeks
 * - Daily = Weekly / No. of working days per week
 * 
 * @param {string} period given period ['Annual', 'Monthly', 'Semi Monthly', 'Weekly', 'Daily']
 * @param {Object} periodList 
 */
export const convertPeriodically = (period, periodList) => {
  let { annual, monthly, semiMonthly, weekly, daily } = periodList
  const workingDaysPerWeek = store.getters.workingDaysPerWeek

  switch (period) {
    case 'annual':
      monthly = (annual / 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
      weekly = (annual / 52).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
      
    case 'monthly':
      annual = (monthly * 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
      weekly = (annual / 52).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
    
    case 'semiMonthly':
      monthly = (semiMonthly * 2).toFixedFloat(2)
      annual = (monthly * 12).toFixedFloat(2)
      weekly = (annual / 52).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break
    
    case 'weekly':
      monthly = ( (weekly * 52) / 12 ).toFixedFloat(2)
      annual = (monthly * 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
      daily = (weekly / workingDaysPerWeek).toFixedFloat(2)
      break

    default:
      weekly = (daily * workingDaysPerWeek).toFixedFloat(2)
      monthly = ((weekly * 52) / 12).toFixedFloat(2)
      annual = (monthly * 12).toFixedFloat(2)
      semiMonthly = (monthly / 2).toFixedFloat(2)
  }

  return {
    annual,
    monthly,
    semiMonthly,
    weekly,
    daily,
  }
}

/**
 * Converts string to start case.
 * 
 * startCase('--foo-bar--') // returns Foo Bar
 * startCase('fooBar') // returns Foo Bar
 * startCase('__FOO_BAR__') // returns Foo Bar
 * 
 * https://lodash.com/docs/4.17.11#startCase
 */
export const toStartCase = str => startCase(str)

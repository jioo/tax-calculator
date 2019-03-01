import { computation, computationFromTable } from './common'
import store from '@/store'

/**
 * ------------------------------------------------------
 *  Annual Tax Table
 * ------------------------------------------------------
 * 
 * https://www.pinoymoneytalk.com/new-income-tax-table-rates-philippines/
 * 
 * Table Result:
 * 
 * | Bracket 	| Taxable Income Per Year        	| Income Tax Rate                                	|
 * |---------	|--------------------------------	|------------------------------------------------	|
 * | 1       	| ₱250,000 and below             	| 0%                                             	|
 * | 2       	| ₱250,001 to ₱400,000     	      | 15% of the excess over ₱250,000                	|
 * | 3       	| ₱400,001 to ₱800,000     	      | ₱22,500 + 20% of the excess over ₱400,000      	|
 * | 4       	| ₱800,001 to ₱2,000,000   	      | ₱102,500 + 25% of the excess over ₱800,000     	|
 * | 5       	| ₱2,000,001 to ₱8,000,000 	      | ₱402,500 + 30% of the excess over ₱2,000,000   	|
 * | 6       	| Above ₱8,000,001               	| ₱2,202,500 + 35% of the excess over ₱8,000,000 	|
 * 
 */
const annualTaxTable = [
  { from: 0,  to: 250000,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 250001, to: 400000, taxableCompensation: 0, percentage: 15, excessOver: 250000, computation, },
  { from: 400001, to: 800000, taxableCompensation: 22500, percentage: 20, excessOver: 400000, computation, },
  { from: 800001, to: 2000000, taxableCompensation: 102500, percentage: 25, excessOver: 800000, computation, },
  { from: 2000001, to: 8000000, taxableCompensation: 402500, percentage: 30, excessOver: 2000000, computation, },
  { from: 8000001, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 2202500, percentage: 35, excessOver: 8000000, computation, },
]

/**
 * ------------------------------------------------------
 *  Monthly Tax Table
 * ------------------------------------------------------
 * 
 * https://www.pinoymoneytalk.com/new-income-tax-table-rates-philippines/
 * 
 * Table Result:
 * 
 * | Bracket 	| Taxable Income per year 	| Income Tax Rate                               	|
 * |---------	|-------------------------	|-----------------------------------------------	|
 * | 1       	| ₱20,833 and below       	| 0%                                            	|
 * | 2       	| ₱20,833 to ₱33,332      	| 15% of the excess over ₱20,833                	|
 * | 3       	| ₱33,333 to ₱66,666      	| ₱1,875 + 25% of the excess over ₱33,333       	|
 * | 4       	| ₱66,667 to ₱166,666     	| ₱8,541.66 + 25% of the excess over ₱66,667   	  |
 * | 5       	| ₱166,667 to ₱666,666    	| ₱33,541.66 + 30% of the excess over ₱166,667  	|
 * | 6       	| Above ₱666,667          	| ₱183,541.66 + 35% of the excess over ₱666,667 	|
 * 
 */
const monthlyTaxTable = [
  { from: 0,  to: 20833,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 20833, to: 33332, taxableCompensation: 0, percentage: 15, excessOver: 20833, computation, },
  { from: 33333, to: 66666, taxableCompensation: 1875, percentage: 20, excessOver: 33333, computation, },
  { from: 66667, to: 166666, taxableCompensation: 8541.66, percentage: 25, excessOver: 66667, computation, },
  { from: 166667, to: 666666, taxableCompensation: 33541.66, percentage: 30, excessOver: 166667, computation, },
  { from: 666667, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 183541.66, percentage: 35, excessOver: 666667, computation, },
]

/**
 * ------------------------------------------------------
 *  8% Withholding Tax for Self-employed and Professionals
 * ------------------------------------------------------
 * 
 * The 8% withholding tax rate replaces the two-tier rate of 10% 
 * (for self-employed and professionals earning less than P720,000 income every year) 
 * or 15% (for those earning more than P720,000 per year).
 * 
 * https://www.pinoymoneytalk.com/8-percent-tax-rate-bir-rmo-23-2018/
 * 
 * 
 * @param {number} salary Monthly Salary
 */
const selfEmployedTax = salary =>  0.08 * (salary - 20833)

/**
 * Compute withholding tax for self employed, private or government employee
 * 
 * @param {array} monthlySalary 
 */
const result = (monthlySalary) => {
  let withholdingTax = 0
  const hasContribution = store.getters.hasContribution,
        monthlyContribution = (hasContribution) ? store.getters.totalContribution : 0,
        taxableIncome = monthlySalary - monthlyContribution

  // Compute withholding tax for Private and Government Employee
  if (store.getters.type !== 'Self Employed')
    withholdingTax = computationFromTable(taxableIncome, monthlyTaxTable).toFixedFloat(2)
  
  // Withholding tax for Self Employed
  else
    withholdingTax = ( selfEmployedTax(taxableIncome) ).toFixedFloat(2)
  
  // Calculate result
  const result = {
    totalContribution: monthlyContribution,
    taxableIncome: (monthlySalary - monthlyContribution).toFixedFloat(2),
    withholdingTax,
    netIncome: (monthlySalary - withholdingTax - monthlyContribution).toFixedFloat(2),
  }

  console.log(result)

  // Update 2023 tax result state
  store.dispatch('update2023Result', result)
}

export default result

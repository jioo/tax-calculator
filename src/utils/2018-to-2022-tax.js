import { computation } from './common'

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
 * | 2       	| ₱250,001 to ₱400,000     	      | 20% of the excess over ₱250,000                	|
 * | 3       	| ₱400,001 to ₱800,000     	      | ₱30,000 + 25% of the excess over ₱400,000      	|
 * | 4       	| ₱800,001 to ₱2,000,000   	      | ₱130,000 + 30% of the excess over ₱800,000     	|
 * | 5       	| ₱2,000,001 to ₱8,000,000 	      | ₱490,000 + 32% of the excess over ₱2,000,000   	|
 * | 6       	| Above ₱8,000,001               	| ₱2,410,000 + 35% of the excess over ₱8,000,000 	|
 * 
 */
export const annualTaxTable = [
  { from: 0,  to: 250000,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 250001, to: 400000, taxableCompensation: 0, percentage: 20, excessOver: 250000, computation, },
  { from: 400001, to: 800000, taxableCompensation: 303000, percentage: 25, excessOver: 400000, computation, },
  { from: 800001, to: 2000000, taxableCompensation: 130000, percentage: 30, excessOver: 800000, computation, },
  { from: 2000001, to: 8000000, taxableCompensation: 490000, percentage: 32, excessOver: 2000000, computation, },
  { from: 8000001, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 2410000, percentage: 35, excessOver: 8000000, computation, },
]

/**
 * ------------------------------------------------------
 *  Monthly Tax Table
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 * Table Result:
 * 
 * | Bracket 	| Taxable Income per year 	| Income Tax Rate                               	|
 * |---------	|-------------------------	|-----------------------------------------------	|
 * | 1       	| ₱20,833 and below       	| 0%                                            	|
 * | 2       	| ₱20,833 to ₱33,332      	| 20% of the excess over ₱20,833                	|
 * | 3       	| ₱33,333 to ₱66,666      	| ₱2,500 + 25% of the excess over ₱33,333       	|
 * | 4       	| ₱66,667 to ₱166,666     	| ₱10,833.33 + 30% of the excess over ₱66,667   	|
 * | 5       	| ₱166,667 to ₱666,666    	| ₱40,833.33 + 32% of the excess over ₱166,667  	|
 * | 6       	| Above ₱666,667          	| ₱200,833.33 + 35% of the excess over ₱666,667 	|
 * 
 */
export const monthlyTaxTable = [
  { from: 0,  to: 20833,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 20833, to: 33332, taxableCompensation: 0, percentage: 20, excessOver: 20833, computation, },
  { from: 33333, to: 66666, taxableCompensation: 2500, percentage: 25, excessOver: 33333, computation, },
  { from: 66667, to: 166666, taxableCompensation: 10833.33, percentage: 30, excessOver: 66667, computation, },
  { from: 166667, to: 666666, taxableCompensation: 40833.33, percentage: 32, excessOver: 166667, computation, },
  { from: 666667, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 200833.33, percentage: 35, excessOver: 666667, computation, },
]

/**
 * ------------------------------------------------------
 *  Semi Monthly Tax Table
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 * Table Result:
 * 
 * | Bracket 	| Compensation Range  	| Income Tax Rate                            	  |
 * |---------	|---------------------	|---------------------------------------------- |
 * | 1       	| ₱10,417 and below   	| 0%                                         	  |
 * | 2       	| ₱10,417 to ₱16,666  	| 20% of the excess over ₱10,417             	  |
 * | 3       	| ₱16,667 to ₱33,332  	| ₱1,250 + 25% of the excess over ₱16,667    	  |
 * | 4       	| ₱33,333 to ₱83,332  	| ₱5,416.67 + 30% of the excess over ₱33,333    |
 * | 5       	| ₱83,333 to ₱333,332 	| ₱20,416.67 + 32% of the excess over ₱83,333   |
 * | 6       	| Above ₱333,333      	| ₱100,416.67 + 35% of the excess over ₱333,333 |
 * 
 */
export const semiMonthlyTaxTable = [
  { from: 0,  to: 10417,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 10417, to: 16666, taxableCompensation: 0, percentage: 20, excessOver: 10417, computation, },
  { from: 16667, to: 33332, taxableCompensation: 1250, percentage: 25, excessOver: 16667, computation, },
  { from: 33333, to: 83332, taxableCompensation: 5416.67, percentage: 30, excessOver: 33333, computation, },
  { from: 83333, to: 333332, taxableCompensation: 20416.67, percentage: 32, excessOver: 83333, computation, },
  { from: 333333, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 100416.67, percentage: 35, excessOver: 333333, computation, },
]

// /**
//  * Compute withholding tax for self employed, private or government employee
//  * 
//  * @param {array} monthlySalary 
//  */
// const result = (monthlySalary) => {
//   let withholdingTax = 0
//   const hasContribution = store.getters.hasContribution,
//         monthlyContribution = (hasContribution) ? store.getters.totalContribution : 0,
//         taxableIncome = monthlySalary - monthlyContribution

//   // Compute withholding tax for Private and Government Employee
//   if (store.getters.type !== 'Self Employed')
//     withholdingTax = computationFromTable(taxableIncome, monthlyTaxTable).toFixedFloat(2)
  
//   // Withholding tax for Self Employed
//   else
//     withholdingTax = ( selfEmployedMonthlyTax(taxableIncome) ).toFixedFloat(2)
  
//   // Calculate result
//   const result = {
//     totalContribution: monthlyContribution,
//     taxableIncome: (monthlySalary - monthlyContribution).toFixedFloat(2),
//     withholdingTax,
//     netIncome: (monthlySalary - withholdingTax - monthlyContribution).toFixedFloat(2),
//   }

//   // Update 2018 tax result state
//   store.dispatch('update2018Result', result)
// }

// export default result
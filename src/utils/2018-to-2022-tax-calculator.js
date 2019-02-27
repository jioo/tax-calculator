import { computation, computationFromTable } from './common'

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
const annualTaxTable = [
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
const monthlyTaxTable = [
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
const semiMonthlyTaxTable = [
  { from: 0,  to: 10417,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 10417, to: 16666, taxableCompensation: 0, percentage: 20, excessOver: 10417, computation, },
  { from: 16667, to: 33332, taxableCompensation: 1250, percentage: 25, excessOver: 16667, computation, },
  { from: 33333, to: 83332, taxableCompensation: 5416.67, percentage: 30, excessOver: 33333, computation, },
  { from: 83333, to: 333332, taxableCompensation: 20416.67, percentage: 32, excessOver: 83333, computation, },
  { from: 333333, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 100416.67, percentage: 35, excessOver: 333333, computation, },
]

/**
 * ------------------------------------------------------
 *  Weekly Tax Table
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 * Table Result:
 * 
 * | Bracket 	| Compensation Range  	| Income Tax Rate                            	  |
 * |---------	|---------------------	|---------------------------------------------- |
 * | 1       	| ₱4,808 and below   	  | 0%                                         	  |
 * | 2       	| ₱4,808 to ₱7,691  	  | 20% of the excess over ₱4,808             	  |
 * | 3       	| ₱7,692 to ₱15,384  	  | ₱576.92 + 25% of the excess over ₱7,692   	  |
 * | 4       	| ₱15,385 to ₱38,461  	| ₱2500 + 30% of the excess over ₱15,385        |
 * | 5       	| ₱38,462 to ₱153,845 	| ₱9423.08 + 32% of the excess over ₱38,462     |
 * | 6       	| Above ₱153,846     	  | ₱46,346.15 + 35% of the excess over ₱153,846  |
 * 
 */
const weeklyTaxTable = [
  { from: 0,  to: 4808,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 4808, to: 7691, taxableCompensation: 0, percentage: 20, excessOver: 4808, computation, },
  { from: 7692, to: 15384, taxableCompensation: 576.92, percentage: 25, excessOver: 7692, computation, },
  { from: 15385, to: 38461, taxableCompensation: 2500, percentage: 30, excessOver: 15385, computation, },
  { from: 38462, to: 153845, taxableCompensation: 9423.08, percentage: 32, excessOver: 38462, computation, },
  { from: 153846, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 46346.15, percentage: 35, excessOver: 153846, computation, },
]


/**
 * ------------------------------------------------------
 *  Daily Tax Table
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 * Table Result:
 * 
 * | Bracket 	| Compensation Range  	| Income Tax Rate                            	  |
 * |---------	|---------------------	|---------------------------------------------- |
 * | 1       	| ₱685 and below   	    | 0%                                         	  |
 * | 2       	| ₱6,857 to ₱1,095  	  | 20% of the excess over ₱685             	    |
 * | 3       	| ₱1,096 to ₱2,191  	  | ₱82.19 + 25% of the excess over ₱1,096    	  |
 * | 4       	| ₱2,192 to ₱5,478  	  | ₱356.16 + 30% of the excess over ₱2,192       |
 * | 5       	| ₱5,479 to ₱21,917 	  | ₱1,342.47 + 32% of the excess over ₱5,479     |
 * | 6       	| Above ₱21,918      	  | ₱6,602.74 + 35% of the excess over ₱21,918    |
 * 
 */
const daliyTaxTable = [
  { from: 0,  to: 685,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },
  { from: 685, to: 1095, taxableCompensation: 0, percentage: 20, excessOver: 685, computation, },
  { from: 1096, to: 2191, taxableCompensation: 82.19, percentage: 25, excessOver: 1096, computation, },
  { from: 2192, to: 5478, taxableCompensation: 356.16, percentage: 30, excessOver: 2192, computation, },
  { from: 5479, to: 21917, taxableCompensation: 1342.47, percentage: 32, excessOver: 5479, computation, },
  { from: 21918, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 6602.74, percentage: 35, excessOver: 21918, computation, },
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
 * @param {number} salary Annual Salary
 */
const selfEmployedTax = salary =>  0.08 * (salary - 250000)

/**
 * 
 * @param {array} data 
 */
const result = (data) => {
  const { 
    totalContribution, 
    annualSalary, 
    monthlySalary,
    semiMonthlySalary,
    weeklySalary,
    dailySalary 
  } = data
  
  const annually = computationFromTable(annualSalary, annualTaxTable),
        monthly = computationFromTable(monthlySalary - totalContribution, monthlyTaxTable),
        semiMonthly = computationFromTable(semiMonthlySalary, semiMonthlyTaxTable),
        weekly = computationFromTable(weeklySalary, weeklyTaxTable),
        daily = computationFromTable(dailySalary, daliyTaxTable)

  return {
    annually,
    monthly,
    semiMonthly,
    weekly,
    daily,
  }
}

// const result = weeklyTaxTable()

export default result
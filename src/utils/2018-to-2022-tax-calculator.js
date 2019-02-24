import { computation, computationFromTable } from './common'

/**
 * 
 * ------------------------------------------------------
 *  Monthly Tax Table
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 */
const monthlyTaxTable = [
  /**
   * 
   * Bracket: ------------------ 1
   * Compensation Range: ------- ₱20,833 and below
   * Income Tax rate ----------- 0%
   * 
   */
  { from: 0,  to: 20833,  taxableCompensation: 0, percentage: 0, excessOver: 0, computation, },

  /**
   * 
   * Bracket: ------------------ 2
   * Compensation Range: ------- ₱20,833 to ₱33,332
   * Income Tax rate ----------- 20% of the excess over ₱20,833
   * 
   */
  { from: 20833, to: 33332, taxableCompensation: 0, percentage: 20, excessOver: 20833, computation, },
  
  /**
   * 
   * Bracket: ------------------ 3
   * Compensation Range: ------- ₱33,333 to ₱66,666
   * Income Tax rate ----------- ₱2,500 + 25% of the excess over ₱33,333
   * 
   */
  { from: 33333, to: 66666, taxableCompensation: 2500, percentage: 25, excessOver: 33333, computation, },

  /**
   * 
   * Bracket: ------------------ 4
   * Compensation Range: ------- ₱66,667 to ₱166,666
   * Income Tax rate ----------- ₱10,833.33 + 30% of the excess over ₱66,667
   * 
   */
  { from: 66667, to: 166666, taxableCompensation: 10833.33, percentage: 30, excessOver: 66667, computation, },

  /**
   * 
   * Bracket: ------------------ 5
   * Compensation Range: ------- ₱166,667 to ₱666,666
   * Income Tax rate ----------- ₱40,833.33 + 32% of the excess over ₱166,667
   * 
   */
  { from: 166667, to: 666666, taxableCompensation: 40833.33, percentage: 32, excessOver: 166667, computation, },

  /**
   * Bracket: ------------------- 6
   * Compensation Range: ------- Above ₱666,667
   * Income Tax rate ----------- ₱200,833.33 + 35% of the excess over ₱666,667
   * 
   */
  { from: 666667, to: Number.MAX_SAFE_INTEGER, taxableCompensation: 200833.33, percentage: 35, excessOver: 666667, computation, },
]

/**
 * 
 * ------------------------------------------------------
 *  Semi Monthly Tax Table (Auto generated)
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 * This generated table is not 100% accurate because of inconsistency in BIR Tax table.
 * Some properties are rounded off, but some are not.
 * 
 * Generated Result:
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
const semiMonthlyTaxTable = () => {
  return monthlyTaxTable
    .map((item, index) => {
      let from = (item.from / 2).toFixedFloat(0),
          to = (item.to !== Number.MAX_SAFE_INTEGER) ? (item.to / 2).toFixedFloat(0) : item.to,
          taxableCompensation = (item.taxableCompensation / 2).toFixedFloat(0),
          excessOver = (item.excessOver / 2).toFixedFloat(0)

      if (index === 2) {
        to -= 1
      }

      if (index === 3) {
        taxableCompensation = (item.taxableCompensation / 2).toFixedFloat(2)
        excessOver -= 1
        to = (item.to / 2) - 1
        from = parseInt(item.from / 2)
      }

      if (index === 4 || index === 5) {
        from -= 1
        to -= 1
        taxableCompensation = (item.taxableCompensation / 2).toFixedFloat(2)
        excessOver -= 1
      } 

      return {
        from: from,
        to: to,
        taxableCompensation: taxableCompensation,
        percentage: item.percentage,
        excessOver: excessOver,
        computation: item.computation,
      }
    })
}

/**
 * 
 * ------------------------------------------------------
 *  Annual Tax Table (Auto generated)
 * ------------------------------------------------------
 * 
 * https://www.pinoymoneytalk.com/new-income-tax-table-rates-philippines/
 * 
 * Generated result:
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
const annualTaxTable = () => {
  return monthlyTaxTable
    .map(item => {
      return {
        from: (item.from * 12).toNearestHundredth() + 1,
        to: (item.to !== Number.MAX_SAFE_INTEGER) ? (item.to * 12).toNearestHundredth() : item.to,
        taxableCompensation: (item.taxableCompensation * 12).toNearestHundredth(),
        excessOver: (item.excessOver * 12).toNearestHundredth(),
        computation: item.computation,
      }
    })
}

const weeklyTaxTable = () => {
  return 
}

/**
 * 
 * ------------------------------------------------------
 *  8% Withholding Tax for Self-employed and Professionals
 * ------------------------------------------------------
 * 
 * The 8% withholding tax rate replaces the two-tier rate of 10% 
 * (for self-employed and professionals earning less than P720,000 income every year) 
 * or 15% (for those earning more than P720,000 per year).
 * 
 * https://www.pinoymoneytalk.com/new-income-tax-table-rates-philippines/
 * 
 */
const selfEmployedTax = salary => 0.08 * salary

const result = (salary) => computationFromTable(salary, monthlyTaxTable)

// const result = semiMonthlyTaxTable()

export default result
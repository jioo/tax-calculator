import { computationFromTable } from './common'

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
  { 
    from: 0, 
    to: 20833, 
    sum: 0, 
    deduct: 0, 
    computation: 0
  },

  /**
   * 
   * Bracket: ------------------ 2
   * Compensation Range: ------- ₱20,833 to ₱33,332
   * Income Tax rate ----------- 20% of the excess over ₱20,833
   * 
   */
  { 
    from: 20833, 
    to: 33332, 
    sum: 0, 
    deduct: 20833, 
    computation: function (salary) { 
      return 0.20 * (salary - this.deduct)
    }
  },
  
  /**
   * 
   * Bracket: ------------------ 3
   * Compensation Range: ------- ₱33,333 to ₱66,666
   * Income Tax rate ----------- ₱2,500 + 25% of the excess over ₱33,333
   * 
   */
  { 
    from: 33333, 
    to: 66666, 
    sum: 2500, 
    deduct: 33333, 
    computation: function (salary) { 
      return this.sum + ( 0.25 * (salary - this.deduct) ) 
    } 
  },

  /**
   * 
   * Bracket: ------------------ 4
   * Compensation Range: ------- ₱66,667 to ₱166,666
   * Income Tax rate ----------- ₱10,833.33 + 30% of the excess over ₱66,667
   * 
   */
  { 
    from: 66667, 
    to: 166666, 
    sum: 10833.33, 
    deduct: 66667, 
    computation: function (salary) { 
      return this.sum + ( 0.30 * (salary - this.deduct) ) 
    } 
  },

  /**
   * 
   * Bracket: ------------------ 5
   * Compensation Range: ------- ₱166,667 to ₱666,666
   * Income Tax rate ----------- ₱40,833.33 + 32% of the excess over ₱166,667
   * 
   */
  { 
    from: 166667, 
    to: 666666, 
    sum: 40833.33, 
    deduct: 166667, 
    computation: function (salary) { 
      return this.sum + ( 0.32 * (salary - this.deduct) ) 
    } 
  },

  /**
   * Bracket: ------------------- 6
   * Compensation Range: ------- Above ₱666,667
   * Income Tax rate ----------- ₱200,833.33 + 35% of the excess over ₱666,667
   * 
   */
  { 
    from: 666667, 
    to: Number.MAX_SAFE_INTEGER, 
    sum: 200833.33, 
    deduct: 666667, 
    computation: function (salary) { 
      return this.sum + ( 0.35 * (salary - this.deduct) ) 
    } 
  },
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
 * | Bracket 	| Compensation Range  	| Income Tax Rate                            	|
 * |---------	|---------------------	|--------------------------------------------	|
 * | 1       	| ₱10,417 and below   	| 0%                                         	|
 * | 2       	| ₱10,417 to ₱16,666  	| 20% of the excess over ₱10,417             	|
 * | 3       	| ₱16,667 to ₱33,333  	| ₱1,250 + 25% of the excess over ₱16,667    	|
 * | 4       	| ₱33,334 to ₱83,333  	| ₱5,417 + 30% of the excess over ₱33,334    	|
 * | 5       	| ₱83,334 to ₱333,333 	| ₱20,417 + 32% of the excess over ₱83,334   	|
 * | 6       	| Above ₱333,334      	| ₱100,417 + 35% of the excess over ₱333,334 	|
 * 
 */
const semiMonthlyTaxTable = () => {
  return monthlyTaxTable
    .map(item => {
      return {
        from: (item.from / 2).toFixedFloat(0),
        to: (item.to !== Number.MAX_SAFE_INTEGER) ? (item.to / 2).toFixedFloat(0) : item.to,
        sum: (item.sum / 2).toFixedFloat(0),
        deduct: (item.deduct / 2).toFixedFloat(0),
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
        sum: (item.sum * 12).toNearestHundredth(),
        deduct: (item.deduct * 12).toNearestHundredth(),
        computation: item.computation,
      }
    })
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

// const result = (salary) => computationFromTable(salary, monthlyTaxTable)

const result = semiMonthlyTaxTable()

export default result
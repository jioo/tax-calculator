import { computationFromTable } from './common'

/**
 * 
 * ------------------------------------------------------
 *  BIR Income Tax Table (for the years 2018-2022)
 * ------------------------------------------------------
 * 
 * https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf
 * 
 */
const employeeTaxTable = [
  /**
   * 
   * Bracket: ------------------ 1
   * Compensation Range: ------- ₱20,833 and below
   * Income Tax rate ----------- 0%
   * 
   */
  { from: 0, to: 20833, computation: 0 },

  /**
   * 
   * Bracket: ------------------ 2
   * Compensation Range: ------- ₱20,833 to ₱33,332
   * Income Tax rate ----------- 20% of the excess over ₱20,833
   * 
   */
  { from: 20833, to: 33332, computation: (salary) => 0.20 * (salary - 20833) },
  /**
   * 
   * Bracket: ------------------ 3
   * Compensation Range: ------- ₱33,333 to ₱66,666
   * Income Tax rate ----------- ₱2,500 + 25% of the excess over ₱33,333
   * 
   */
  { from: 33333, to: 66666, computation: (salary) => ( 2500 + (0.25 * (salary - 33333)) ) },

  /**
   * 
   * Bracket: ------------------ 4
   * Compensation Range: ------- ₱66,667 to ₱166,666
   * Income Tax rate ----------- ₱10,833.33 + 30% of the excess over ₱66,667
   * 
   */
  { from: 66667, to: 166666, computation: (salary) => ( 10833.33 + (0.30 * (salary - 66667)) ) },

  /**
   * 
   * Bracket: ------------------ 5
   * Compensation Range: ------- ₱166,667 to ₱666,666
   * Income Tax rate ----------- ₱40,833.33 + 32% of the excess over ₱166,667
   * 
   */
  { from: 166667, to: 666666, computation: (salary) => ( 40833.33 + (0.32 * (salary - 166667)) ) },

  /**
   * Bracket: ------------------- 6
   * Compensation Range: ------- Above ₱666,667
   * Income Tax rate ----------- ₱200,833.33 + 35% of the excess over ₱66,6667
   * 
   */
  { from: 666667, to: Number.MAX_SAFE_INTEGER, computation: (salary) => ( 200833.33 + (0.35 * (salary - 666667)) ) },
]

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

const result = (salary) => computationFromTable(salary, employeeTaxTable)

export default result
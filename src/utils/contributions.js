import { computationFromTable } from './common'

/**
 * 
 * ------------------------------------------------------
 *  (SSS) Social Security System
 * ------------------------------------------------------
 * 
 * https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution
 * 
 */
const sssTable = () => {

  let table = [], 
      baseContribution = 54.50,
      loopCounter = 2

  const CONTRIBUTION_INC = 18.2,
        RANGE_INC = 500
  
  /**
   *  
   * the Range of Compensation increments by 500 from above ₱1,250.
   * 
   * contribution starts from 36.30 then increments by (18.2), but for every 3rd 
   * row the increment value is changed from (18.1).
   * 
   */
  for (let range = 1250; range < 15750; range += RANGE_INC) {

    table.push({ 
      from: range, 
      to: range + (RANGE_INC - 0.1), 
      computation: baseContribution.toFixedFloat(2) 
    })
    
    if (loopCounter === 3) {
      loopCounter = 0
      baseContribution += (CONTRIBUTION_INC - 0.1)
    } 
    else
      baseContribution += CONTRIBUTION_INC
    
    loopCounter++
  }

  // manually add the first and last Range of Compensation.
  table.unshift({ from: 0, to: 1249.99, computation: 36.30 })
  table.push({ from: 15750, to: Number.MAX_SAFE_INTEGER, computation: 581.30 })

  return table
}

/**
 * 
 * ------------------------------------------------------
 *  (GSIS) Government Service Insurance System
 * ------------------------------------------------------
 * 
 * https://www.gsis.gov.ph/active-members/contributions/
 * 
 */
const gsisContribution = (salary) => 0.09 * salary 

/**
 * 
 * ------------------------------------------------------
 *  (PAGIBIG) Pagtutulungan sa Kinabukasan: Ikaw, Bangko, 
 *  Industria at Gobyerno
 * ------------------------------------------------------
 * 
 * https://powerpinoys.com/new-pagibig-contribution-table/
 * 
 */
const pagibigContribution = (salary) => {

  // If you are an employee who earns more than P5,000 monthly, your salary will 
  // automatically be deducted P100. Similarly, your employer should pay P100.
  if (salary > 5000) return 100

  // Return the 2% of your monthly salary
  return salary * 0.02
}

/**
 * 
 * ------------------------------------------------------
 *  (Philhealth) Philippine Health Insurance Corporation
 * ------------------------------------------------------
 * 
 * https://www.philhealth.gov.ph/advisories/2018/adv2018-0003.pdf
 * 
 */
const philhealthTable = [
  /**
   * 
   * Monthly Salary Range: -------- ₱10,000 and below
   * Monthly Premium: ------------- ₱275.00
   * Personal/Employer Share: ----- ₱137.50
   * 
   */
  { from: 0, to: 10000, computation: 137.50 },

  /**
   * 
   * Monthly Salary Range: -------- ₱10,000.01 up to ₱39,999.99
   * Monthly Premium: ------------- ₱275.50 up to ₱1,099.99
   * Personal/Employer Share: ----- ₱137.50 up to ₱549.99
   * 
   */
  { from: 10000.01, to: 39999.99, computation: (salary) => (salary * 0.0275) / 2 },

  /**
   * 
   * Monthly Salary Range: -------- ₱40,000 and above
   * Monthly Premium: ------------- ₱1,100.00
   * Personal/Employer Share: ----- ₱550.00
   * 
   */
  { from: 40000, to: Number.MAX_SAFE_INTEGER, computation: 550 },
]

const compute = (salary) => {
  const sss = computationFromTable(salary, sssTable()),
        gsis = gsisContribution(salary),
        pagibig = pagibigContribution(salary),
        philhealth = computationFromTable(salary, philhealthTable)

  return {
    sss,
    gsis,
    pagibig,
    philhealth,
  }
}

export default compute
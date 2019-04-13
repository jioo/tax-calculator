import { computationFromTable } from './common'

/**
 * ------------------------------------------------------
 *  (SSS) Social Security System
 * ------------------------------------------------------
 * 
 * https://www.sss.gov.ph/sss/DownloadContent?fileName=2019_Contribution_Schedule.pdf
 * 
 */
const sssTable = () => {

  let resultTable = [],
      baseContribution = 100

  const contributionIncrement = 20,
        rangeIncrement = 500

  for (let range = 2250; range < 19750; range += rangeIncrement) {
    resultTable.push({ 
      from: range, 
      to: range + (rangeIncrement - 0.1), 
      computation: baseContribution.toFixedFloat(2) 
    })

    baseContribution += contributionIncrement
  }

  // Manually add the first and last Range of Compensation.
  resultTable.unshift({ from: 0, to: 2249.99, computation: 80 })
  resultTable.push({ from: 19750, to: Number.MAX_SAFE_INTEGER, computation: 800 })

  return resultTable
}

/**
 * ------------------------------------------------------
 *  (GSIS) Government Service Insurance System
 * ------------------------------------------------------
 * 
 * https://www.gsis.gov.ph/active-members/contributions/
 * 
 */
const gsisContribution = (salary) => 0.09 * salary 

/**
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
 * ------------------------------------------------------
 *  (Philhealth) Philippine Health Insurance Corporation
 * ------------------------------------------------------
 * 
 * https://www.philhealth.gov.ph/advisories/2018/adv2018-0003.pdf
 * 
 * 
 * | Monthly Salary Range        	| Monthly Premium         	| Personal Share        	| Employer Share        	|
 * |-----------------------------	|-------------------------	|-----------------------	|-----------------------	|
 * | ₱10,000 and below           	| ₱275.00                 	| ₱137.50               	| ₱137.50               	|
 * | ₱10,000.01 up to ₱39,999.99 	| ₱275.50 up to ₱1,099.99 	| ₱137.50 up to ₱549.99 	| ₱137.50 up to ₱549.99 	|
 * | ₱40,000 and above           	| ₱1,100.00               	| ₱550.00               	| ₱550.00               	|
 * 
 */
const philhealthTable = [
  { from: 0, to: 10000, computation: 137.50 },
  { from: 10000.01, to: 39999.99, computation: (salary) => (salary * 0.0275) / 2 },
  { from: 40000, to: Number.MAX_SAFE_INTEGER, computation: 550 },
]

/**
 * Caculate each contributions
 * 
 * @param {number} salary 
 */
const contributions = (salary) => {
  const sss = computationFromTable(salary, sssTable()).toFixedFloat(2),
        gsis = gsisContribution(salary).toFixedFloat(2),
        pagibig = pagibigContribution(salary).toFixedFloat(2),
        philhealth = computationFromTable(salary, philhealthTable).toFixedFloat(2)

  return {
    sss,
    gsis,
    pagibig,
    philhealth,
  }
}

export default contributions
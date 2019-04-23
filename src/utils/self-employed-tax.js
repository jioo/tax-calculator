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
 */

/**
 * Monthly Tax computation for Self Employed
 * 
 * @param {number} salary Monthly Salary
 */
export const monthlyTax = salary =>  0.08 * (salary - 20833)

/**
 * Semi Monthly Tax computation for Self Employed
 * 
 * @param {number} salary Semi Monthly Salary
 */
export const semiMonthlyTax = salary => 0.08 * (salary - 10417)
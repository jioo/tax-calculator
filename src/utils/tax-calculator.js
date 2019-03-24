import { computationFromTable } from './common'
import store from '@/store'
import * as tax2018to2022 from './2018-to-2022-tax'
import * as tax2023 from './2023-tax-tax'
import * as selfEmployedTax from './self-employed-tax'

/**
 * 
 */
const calculate = ({
  periodType,
  deductions,
  value,
} = {}) => {

  /**
   * valid values: ['monthly', 'semiMonthly']
   */
  periodType = periodType || 'semiMonthly'

  /**
   * Deductions for 1st and 2nd cutoff.
   * 
   * Note: currently applicable only for `Semi Monthly` type
   */
  deductions = deductions || [0, 0]
  
  /**
   * Dynamic value for different kind of period type
   * 
   * For Monthly: { monthly: 30000 }
   * For Semi Monthly: { semiMonthly: [15000, 15000] }
   */
  value = value || {}
  if (!value) throw new Error('Incorrect object value')

  /**
   * 
   */
  let result = {}

  switch (periodType) {
    case 'monthly':
      result = calculateMonthly(value)
      break

    case 'semiMonthly':
      result = calculateSemiMonthly(value)
      break

    default:
      throw new Error('Invalid period type')
  }

  store.dispatch('update2018Result', { 
    periodType, 
    [periodType]: result.result2018,
  })

  store.dispatch('update2023Result', { 
    periodType, 
    [periodType]: result.result2023,
  })
}

/**
 * @param {Object} value 
 */
const calculateMonthly = (value) => {

  let withholdingTax2018 = withholdingTax2023 = 0

  const monthlySalary = value['monthly'],
        hasContribution = store.getters.hasContribution,
        totalContribution = (hasContribution) ? store.getters.totalContribution : 0,
        taxableIncome = (monthlySalary - totalContribution).toFixedFloat(2)

  // Compute withholding tax for Private and Government Employee
  if (store.getters.type !== 'Self Employed') {
    withholdingTax2018 = computationFromTable(taxableIncome, tax2018to2022['monthlyTaxTable']).toFixedFloat(2)
    withholdingTax2023 = computationFromTable(taxableIncome, tax2023['monthlyTaxTable']).toFixedFloat(2)
  }

  // Withholding tax for Self Employed
  else {
    withholdingTax2018 = withholdingTax2023 = ( selfEmployedTax['monthlyTax'](taxableIncome) ).toFixedFloat(2)
  }

  const otherInfo = {
    totalContribution,
    taxableIncome,
  }

  return {
    result2018: {
      ...otherInfo, 
      withholdingTax: withholdingTax2018,
      netIncome: (monthlySalary - withholdingTax2018 - totalContribution).toFixedFloat(2),
    },
    result2023: {
      ...otherInfo, 
      withholdingTax: withholdingTax2023,
      netIncome: (monthlySalary - withholdingTax2023 - totalContribution).toFixedFloat(2),
    }
  }
}

/**
 * @param {Object} value 
 */
const calculateSemiMonthly = (value) => {
  let withholdingTax2018 = withholdingTax2023 = []

  const salaries = [ value['semiMonthly'][0], value['semiMonthly'][1] ],
        hasContribution = store.getters.hasContribution,
        totalContribution = (hasContribution) ? semiMonthlyContributions() : [0, 0],
        taxableIncome = salaries.map((salary, index) => {
          (salary - totalContribution[index]).toFixedFloat(2)
        })

  // Compute withholding tax for Private and Government Employee
  if (store.getters.type !== 'Self Employed') {
    withholdingTax2018 = taxableIncome.map(income => {
      return computationFromTable(income, tax2023['semiMonthlyTaxTable']).toFixedFloat(2)
    })

    withholdingTax2018 = taxableIncome.map(income => {
      return computationFromTable(income, tax2023['semiMonthlyTaxTable']).toFixedFloat(2)
    })
  }

  // Withholding tax for Self Employed
  else {
    withholdingTax2018 = withholdingTax2023 = taxableIncome.map(income => {
      return ( selfEmployedTax['semiMonthlyTax'](income) ).toFixedFloat(2)
    })
  }

  const result2018 = withholdingTax2018.map((withholdingTax, index) => {
    return {
      totalContribution: totalContribution[index],
      withholdingTax,
      netIncome: (salaries[index] - withholdingTax - totalContribution[index]).toFixedFloat(2),
    }
  })

  const result2023 = withholdingTax2023.map((withholdingTax, index) => {
    return {
      totalContribution: totalContribution[index],
      withholdingTax,
      netIncome: (salaries[index] - withholdingTax - totalContribution[index]).toFixedFloat(2),
    }
  })

  return {
    result2018,
    result2023,
  }
}

const semiMonthlyContributions = () => {
  let firstCutoff = secondCutoff = 0
  const contributions = store.getters.contributions,
        type = store.getters.type

  /**
   * Remove a contribution depending on current employee type
   */
  if (type === 'Government Employee')
    delete contributions['sss']
  else
    delete contributions['gsis']

  /**
   * Compute contributions for 1st and 2nd cutoff
   */
  for (let contribution in contributions) {
    firstCutoff += contribution.value * (contribution.percent / 100)
    secondCutoff += contribution.value * ((100 - contribution.percent) / 100)
  }
  
  return [firstCutoff, secondCutoff]
}

export default calculate
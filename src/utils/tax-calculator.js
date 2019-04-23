import { computationFromTable } from './common'
import store from '@/store'
import * as tax2018to2022 from './2018-to-2022-tax'
import * as tax2023 from './2023-tax'
import * as selfEmployedTax from './self-employed-tax'

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
   */
  value = value || {}
  if (!value) throw new Error('Incorrect object value')

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

  let withholdingTax2018 = 0, withholdingTax2023 = 0

  const monthlySalary = value['monthly']
  const hasContribution = store.getters.hasContribution
  const totalContribution = (hasContribution) ? store.getters.totalContribution : 0
  const taxableIncome = (monthlySalary - totalContribution).toFixedFloat(2)

  // Compute withholding tax for Private and Government Employee
  if (store.getters.type !== 'Self Employed') {
    withholdingTax2018 = computationFromTable(taxableIncome, tax2018to2022['monthlyTaxTable']).toFixedFloat(2)
    withholdingTax2023 = computationFromTable(taxableIncome, tax2023['monthlyTaxTable']).toFixedFloat(2)
  }

  // Withholding tax for Self Employed
  else {
    withholdingTax2018 = (selfEmployedTax['monthlyTax'](taxableIncome)).toFixedFloat(2)
    withholdingTax2023 = (selfEmployedTax['monthlyTax'](taxableIncome)).toFixedFloat(2)
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
 * @param {Object} cutOffs 
 */
const calculateSemiMonthly = (cutOffs) => {
  let withholdingTax2018 = [], withholdingTax2023 = []

  const hasContribution = store.getters.hasContribution
  const totalContribution = (hasContribution) ? semiMonthlyContributions() : [0, 0]

  // Compute the taxable income of salaries by subtrating total deductions to total income
  const taxableIncome = cutOffs.map((value, index) => {
    const { salary, otherIncome, otherDeduction, absentDeduction, lateDeduction } = value
    let totalIncome = salary + otherIncome
    let totalDeduction = otherDeduction + absentDeduction + lateDeduction + totalContribution[index]

    return (totalIncome - totalDeduction).toFixedFloat(2)
  })

  // Compute withholding tax for Private and Government Employee
  if (store.getters.type !== 'Self Employed') {
    withholdingTax2018 = taxableIncome.map(income => {
      return computationFromTable(income, tax2018to2022['semiMonthlyTaxTable']).toFixedFloat(2)
    })

    withholdingTax2023 = taxableIncome.map(income => {
      return computationFromTable(income, tax2023['semiMonthlyTaxTable']).toFixedFloat(2)
    })
  }

  // Withholding tax for Self Employed
  else {
    const selfEmployedResult = taxableIncome.map(income => {
      return (selfEmployedTax['semiMonthlyTax'](income)).toFixedFloat(2)
    })

    withholdingTax2018 = selfEmployedResult
    withholdingTax2023 = selfEmployedResult
  }

  const result2018 = withholdingTax2018.map((withholdingTax, index) => {
    const { salary, otherIncome, otherDeduction, absentDeduction, lateDeduction } = cutOffs[index]

    return {
      basicPay: salary,
      otherIncome: otherIncome,
      totalDeduction: otherDeduction + absentDeduction + lateDeduction,
      totalContribution: totalContribution[index],
      taxableIncome: taxableIncome[index],
      withholdingTax,
      netIncome: (taxableIncome[index] - withholdingTax).toFixedFloat(2),
    }
  })

  const result2023 = withholdingTax2023.map((withholdingTax, index) => {
    const { salary, otherIncome, otherDeduction, absentDeduction, lateDeduction } = cutOffs[index]

    return {
      basicPay: salary,
      otherIncome: otherIncome,
      totalDeduction: otherDeduction + absentDeduction + lateDeduction,
      totalContribution: totalContribution[index],
      taxableIncome: taxableIncome[index],
      withholdingTax,
      netIncome: (taxableIncome[index] - withholdingTax).toFixedFloat(2),
    }
  })

  return {
    result2018,
    result2023,
  }
}

const semiMonthlyContributions = () => {
  let firstCutoff = 0, secondCutoff = 0
  const contributions = Object.assign({}, store.getters.contributions)
  const type = store.getters.type

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
    let data = contributions[contribution]

    firstCutoff += data.value * (data.percent / 100)
    secondCutoff += data.value * ((100 - data.percent) / 100)
  }
  return [firstCutoff, secondCutoff]
}

export default calculate
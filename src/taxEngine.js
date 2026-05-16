import {
  STANDARD_DEDUCTION_NEW, STANDARD_DEDUCTION_OLD, PROF_TAX_CAP, EMPLOYER_NPS_PCT_OF_BASIC,
  CAP_80C, CAP_80CCD1B, CAP_80D_SELF_BELOW60, CAP_80D_SELF_ABOVE60, CAP_80D_PARENTS_BELOW60,
  CAP_80D_PARENTS_ABOVE60, CAP_24B, CAP_80TTA, CAP_80TTB, REBATE_87A_NEW_INCOME_LIMIT,
  REBATE_87A_NEW_MAX, MARGINAL_RELIEF_THRESHOLD, REBATE_87A_OLD_INCOME_LIMIT, REBATE_87A_OLD_MAX,
  CESS_RATE, HRA_METRO_PCT, HRA_NONMETRO_PCT, NEW_REGIME_SLABS, OLD_REGIME_SLABS_BELOW60,
  OLD_REGIME_SLABS_SENIOR, OLD_REGIME_SLABS_SUPER_SENIOR
} from './constants'

import { toNum, calc80CTotal } from './utils'

export function applySlabs(income, slabs) {
  if (income <= 0) return 0
  let tax = 0, prev = 0
  for (const { upTo, rate } of slabs) {
    if (upTo === null) { tax += (income - prev) * rate; break }
    if (income <= upTo) { tax += (income - prev) * rate; break }
    tax += (upTo - prev) * rate
    prev = upTo
  }
  return Math.round(tax)
}

export function calculateGrossIncome(data) {
  return (toNum(data.takeHomeSalaryMonthly) * 12) +
    (data.hasBonus ? toNum(data.bonus) : 0) +
    (data.hasOtherIncome ? toNum(data.fdInterest) + toNum(data.savingsInterest) : 0)
}

export function calculateHRAExemption(data) {
  if (!data.paysRent || !data.hasHRA || toNum(data.hraMonthly) <= 0) return 0
  const annualHRAReceived = toNum(data.hraMonthly) * 12
  const annualBasic = toNum(data.basicSalaryMonthly) * 12
  const annualRentPaid = toNum(data.monthlyRent) * 12
  
  const pct = data.cityType === 'metro' ? HRA_METRO_PCT : HRA_NONMETRO_PCT
  const cond1 = annualHRAReceived
  const cond2 = pct * annualBasic
  const cond3 = annualRentPaid - (0.10 * annualBasic)
  
  return Math.max(0, Math.min(cond1, cond2, cond3))
}

export function calculateNewRegimeTax(data) {
  const grossIncome = calculateGrossIncome(data)
  const annualBasic = toNum(data.basicSalaryMonthly) * 12
  const employerNPS = data.hasEmployerNPS ? Math.min(toNum(data.employerNPS), EMPLOYER_NPS_PCT_OF_BASIC * annualBasic) : 0
  
  const taxableIncome = Math.max(0, grossIncome - STANDARD_DEDUCTION_NEW - employerNPS)
  const slabTax = applySlabs(taxableIncome, NEW_REGIME_SLABS)
  
  const rebate = (taxableIncome <= REBATE_87A_NEW_INCOME_LIMIT) ? Math.min(slabTax, REBATE_87A_NEW_MAX) : 0
  const taxAfterRebate = Math.max(0, slabTax - rebate)
  
  const excess = taxableIncome - MARGINAL_RELIEF_THRESHOLD
  const marginalRelief = (taxableIncome > MARGINAL_RELIEF_THRESHOLD && rebate === 0 && taxAfterRebate > excess) ? taxAfterRebate - excess : 0
  
  const taxAfterRelief = Math.max(0, taxAfterRebate - marginalRelief)
  const cess = Math.round(taxAfterRelief * CESS_RATE)
  const totalTax = taxAfterRelief + cess
  
  return {
    grossIncome, taxableIncome, standardDeduction: STANDARD_DEDUCTION_NEW, professionalTaxDeduction: 0,
    hraExemption: 0, deduction80C: 0, deduction80D: 0, deductionPersonalNPS: 0, employerNPSDeduction: employerNPS,
    deductionHomeLoanInterest: 0, deduction80TTA_TTB: 0, slabTax, rebate, marginalRelief, cess, totalTax
  }
}

export function calculateOldRegimeTax(data) {
  const grossIncome = calculateGrossIncome(data)
  const annualBasic = toNum(data.basicSalaryMonthly) * 12
  
  const professionalTaxDeduction = data.hasProfTax ? Math.min(toNum(data.professionalTax), PROF_TAX_CAP) : 0
  const hraExemption = calculateHRAExemption(data)
  
  const raw80C = calc80CTotal(data)
  const deduction80C = Math.min(raw80C, CAP_80C)
  
  let deduction80D = 0
  if (data.hasSelfInsurance) {
    const isSenior = data.ageGroup === 'senior' || data.ageGroup === 'superSenior'
    deduction80D += Math.min(toNum(data.selfInsurancePremium), isSenior ? CAP_80D_SELF_ABOVE60 : CAP_80D_SELF_BELOW60)
  }
  if (data.hasParentInsurance) {
    deduction80D += Math.min(toNum(data.parentInsurancePremium), data.parentsAbove60 ? CAP_80D_PARENTS_ABOVE60 : CAP_80D_PARENTS_BELOW60)
  }
  
  const deductionHomeLoanInterest = (data.hasHomeLoan && data.loanOwnership !== 'other') ? Math.min(toNum(data.homeLoanInterest), CAP_24B) : 0
  
  let deduction80TTA_TTB = 0
  const fd = toNum(data.fdInterest)
  const savings = toNum(data.savingsInterest)
  if (data.hasOtherIncome) {
    if (data.ageGroup === 'senior' || data.ageGroup === 'superSenior') {
      deduction80TTA_TTB = Math.min(fd + savings, CAP_80TTB)
    } else {
      deduction80TTA_TTB = Math.min(savings, CAP_80TTA)
    }
  }
  
  const deductionPersonalNPS = data.hasPersonalNPS ? Math.min(toNum(data.personalNPS), CAP_80CCD1B) : 0
  const employerNPSDeduction = data.hasEmployerNPS ? Math.min(toNum(data.employerNPS), EMPLOYER_NPS_PCT_OF_BASIC * annualBasic) : 0
  
  const totalDeductions = STANDARD_DEDUCTION_OLD + professionalTaxDeduction + hraExemption + deduction80C +
    deduction80D + deductionHomeLoanInterest + deduction80TTA_TTB + deductionPersonalNPS + employerNPSDeduction
    
  const taxableIncome = Math.max(0, grossIncome - totalDeductions)
  
  let slabs = OLD_REGIME_SLABS_BELOW60
  if (data.ageGroup === 'senior') slabs = OLD_REGIME_SLABS_SENIOR
  if (data.ageGroup === 'superSenior') slabs = OLD_REGIME_SLABS_SUPER_SENIOR
  
  const slabTax = applySlabs(taxableIncome, slabs)
  
  const rebate = (data.ageGroup !== 'superSenior' && taxableIncome <= REBATE_87A_OLD_INCOME_LIMIT) ? Math.min(slabTax, REBATE_87A_OLD_MAX) : 0
  const taxAfterRebate = Math.max(0, slabTax - rebate)
  const cess = Math.round(taxAfterRebate * CESS_RATE)
  const totalTax = taxAfterRebate + cess
  
  return {
    grossIncome, taxableIncome, standardDeduction: STANDARD_DEDUCTION_OLD, professionalTaxDeduction,
    hraExemption, deduction80C, deduction80D, deductionPersonalNPS, employerNPSDeduction,
    deductionHomeLoanInterest, deduction80TTA_TTB, slabTax, rebate, marginalRelief: 0, cess, totalTax
  }
}

export function compareRegimes(newResult, oldResult) {
  const savings = Math.abs(newResult.totalTax - oldResult.totalTax)
  const recommended = newResult.totalTax <= oldResult.totalTax ? 'new' : 'old'
  return { recommended, savings }
}

export function calculateTDSPosition(totalTax, tdsDeducted) {
  if (tdsDeducted > totalTax) return { type: 'refund', amount: tdsDeducted - totalTax }
  if (tdsDeducted < totalTax) return { type: 'payable', amount: totalTax - tdsDeducted }
  return { type: 'settled', amount: 0 }
}

export function computeTax(data) {
  const newRegime = calculateNewRegimeTax(data)
  const oldRegime = calculateOldRegimeTax(data)
  const { recommended, savings } = compareRegimes(newRegime, oldRegime)
  
  const employerTDS = data.hasTDS ? toNum(data.tdsDeducted) : 0
  const bankTDS = data.hasOtherIncome ? toNum(data.bankTDS) : 0
  const totalTDS = employerTDS + bankTDS
  
  const recommendedTax = recommended === 'new' ? newRegime.totalTax : oldRegime.totalTax
  const tds = calculateTDSPosition(recommendedTax, totalTDS)
  
  return { newRegime, oldRegime, recommended, savings, tds, tdsDeducted: totalTDS, employerTDS, bankTDS }
}

import { useState } from 'react'
import { computeTax } from './taxEngine'
import S01_Landing from './components/steps/S01_Landing'
import S02_FinancialYear from './components/steps/S02_FinancialYear'
import S03_AgeGroup from './components/steps/S03_AgeGroup'
import S04_SalaryDetails from './components/steps/S04_SalaryDetails'
import S05_Exemptions from './components/steps/S05_Exemptions'
import S06_Allowances from './components/steps/S06_Allowances'
import S07_OtherIncome from './components/steps/S07_OtherIncome'
import S08_Deductions80C from './components/steps/S08_Deductions80C'
import S09_PersonalNPS from './components/steps/S09_PersonalNPS'
import S10_MedicalInsurance from './components/steps/S10_MedicalInsurance'
import S11_HomeLoan from './components/steps/S11_HomeLoan'
import S12_TDS from './components/steps/S12_TDS'
import TaxSummaryView from './results/TaxSummaryView'

export const INITIAL_STATE = {
  fy: '2025-26',
  ageGroup: null,              // 'below60' | 'senior' | 'superSenior'
  basicSalaryMonthly: '',
  takeHomeSalaryMonthly: '',
  hasBonus: null,              // boolean | null
  bonus: '',                   // annual figure (FrequencyInput handles conversion)
  hasHRA: false,
  hraMonthly: '',
  hasProfTax: false,
  professionalTax: '',         // annual, capped at 2500 in engine
  hasEmployerNPS: false,
  employerNPS: '',             // annual, capped at 14% of basic in engine
  hasOtherIncome: null,        // boolean | null
  fdInterest: '',
  savingsInterest: '',
  paysRent: null,              // boolean | null
  monthlyRent: '',
  cityType: null,              // 'metro' | 'nonMetro'
  hasHRAInSalary: null,        // boolean | null
  investments80C: {
    epf: '',
    lic: '',
    ppf: '',
    elss: '',
    tuition: '',
    homeLoanPrincipal: '',
    nsc: '',
  },
  has80CItems: [],             // array of selected 80C keys e.g. ['epf', 'ppf']
  hasPersonalNPS: null,        // boolean | null
  personalNPS: '',             // annual
  hasSelfInsurance: null,      // boolean | null
  selfInsurancePremium: '',    // annual
  hasParentInsurance: null,    // boolean | null
  parentInsurancePremium: '',  // annual
  parentsAbove60: null,        // boolean | null
  hasHomeLoan: null,           // boolean | null
  loanOwnership: null,         // 'own' | 'joint' | 'other'
  homeLoanInterest: '',        // annual
  hasTDS: null,                // boolean | null
  tdsDeducted: '',             // employer TDS for the year
  bankTDS: '',                 // bank TDS on FD interest
}

export default function App() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_STATE)
  const [results, setResults] = useState(null)

  function update(fields) { setData(prev => ({ ...prev, ...fields })) }
  
  function goNext() { 
    if (step === 12) {
      try {
        const computed = computeTax(data)
        setResults(computed)
      } catch (err) {
        console.error("Failed to compute tax", err)
      }
    }
    setStep(s => s + 1) 
  }
  
  function goBack() { setStep(s => Math.max(1, s - 1)) }
  function skipTo(targetStep) { setStep(targetStep) }
  function reset() { setData(INITIAL_STATE); setResults(null); setStep(1) }

  const PROGRESS_STEPS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const TOTAL_PROGRESS = 10
  const progressStep = PROGRESS_STEPS.indexOf(step) + 1
  const showProgress = PROGRESS_STEPS.includes(step)

  const sharedProps = { data, update, goNext, goBack, skipTo, step, progressStep, showProgress, TOTAL_PROGRESS, reset }

  if (step === 1) return <S01_Landing goNext={goNext} />
  if (step === 2) return <S02_FinancialYear {...sharedProps} />
  if (step === 3) return <S03_AgeGroup {...sharedProps} />
  if (step === 4) return <S04_SalaryDetails {...sharedProps} />
  if (step === 5) return <S05_Exemptions {...sharedProps} />
  if (step === 6) return <S06_Allowances {...sharedProps} />
  if (step === 7) return <S07_OtherIncome {...sharedProps} />
  if (step === 8) return <S08_Deductions80C {...sharedProps} />
  if (step === 9) return <S09_PersonalNPS {...sharedProps} />
  if (step === 10) return <S10_MedicalInsurance {...sharedProps} />
  if (step === 11) return <S11_HomeLoan {...sharedProps} />
  if (step === 12) return <S12_TDS {...sharedProps} />
  
  if (step === 13 && results) {
    return <TaxSummaryView data={data} results={results} reset={reset} editStep={skipTo} />
  }

  // Fallback
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="text-slate-500">Loading results...</div>
      <button onClick={goBack} className="mt-4 text-indigo-400 underline">Go Back</button>
    </div>
  )
}

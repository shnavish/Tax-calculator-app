import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "Is savings account interest taxable?", a: "Yes, but you get a deduction up to ₹10,000 under Section 80TTA in the Old Regime." },
  { q: "What about FD interest?", a: "FD interest is fully taxable at your slab rate. For Senior Citizens, 80TTB provides up to ₹50,000 deduction on both FD and Savings interest." }
]

export default function S07_OtherIncome(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function handleNext() {
    if (data.hasOtherIncome === null) {
      setErrors({ hasOtherIncome: 'Please select Yes or No' })
      return
    }
    setErrors({})
    goNext()
  }

  return (
    <StepWrapper {...props} stepName="Other Income">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📈</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Income</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-6">
        Did you earn any other income?
      </h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Do you have interest income from FDs or Savings Accounts? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => { update({ hasOtherIncome: true }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasOtherIncome === true ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasOtherIncome: false, fdInterest: '', savingsInterest: '' }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasOtherIncome === false ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              No
            </button>
          </div>
          {errors.hasOtherIncome && <p className="text-sm text-red-600">Please select Yes or No.</p>}
        </div>

        {data.hasOtherIncome && (
          <div className="bg-indigo-50/50 border border-indigo-800 rounded-xl p-4 reveal space-y-4">
            <NumberInput
              id="fd"
              label="Fixed Deposit (FD) Interest"
              value={data.fdInterest}
              onChange={val => update({ fdInterest: val })}
              hint="Annual interest earned on FDs"
            />
            <NumberInput
              id="sb"
              label="Savings Account Interest"
              value={data.savingsInterest}
              onChange={val => update({ savingsInterest: val })}
              hint="Engine auto-applies 80TTA/80TTB deductions"
            />
          </div>
        )}
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={questions} />
    </StepWrapper>
  )
}

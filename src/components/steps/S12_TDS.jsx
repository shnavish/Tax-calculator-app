import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import FrequencyInput from '../FrequencyInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "What is TDS?", a: "Tax Deducted at Source. Your employer automatically deducts a portion of your tax every month before crediting your salary." },
  { q: "Where do I find my TDS?", a: "Check your Form 16 or your monthly salary slip." }
]

export default function S12_TDS(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function handleNext() {
    if (data.hasTDS === null) {
      setErrors({ hasTDS: 'Please select Yes or No' })
      return
    }
    setErrors({})
    goNext()
  }

  return (
    <StepWrapper {...props} stepName="Taxes Paid">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">✂️</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Taxes Paid</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-6">
        Has your employer deducted any TDS?
      </h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tax Deducted at Source (TDS) on Salary <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => { update({ hasTDS: true }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasTDS === true ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasTDS: false, tdsDeducted: '' }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasTDS === false ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              No
            </button>
          </div>
          {errors.hasTDS && <p className="text-sm text-red-600">Please select Yes or No.</p>}
        </div>

        {data.hasTDS && (
          <div className="bg-indigo-50/50 border border-indigo-800 rounded-xl p-4 reveal space-y-4">
            <FrequencyInput
              id="tds_sal"
              label="TDS deducted by employer"
              value={data.tdsDeducted}
              onChange={val => update({ tdsDeducted: val })}
              hint="Total tax already paid so far"
            />
          </div>
        )}

        {data.hasOtherIncome && (
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4">TDS on Other Income</h3>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <NumberInput
                id="tds_bank"
                label="TDS deducted by banks (e.g. on FDs)"
                value={data.bankTDS}
                onChange={val => update({ bankTDS: val })}
                hint="Banks deduct 10% TDS on FD interest if it exceeds ₹40k (₹50k for seniors)."
              />
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        See Final Results
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <CommonQuestions ref={faqRef} questions={questions} />
    </StepWrapper>
  )
}

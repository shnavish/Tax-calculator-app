import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "What is Section 24B?", a: "It allows you to deduct up to ₹2 Lakhs of interest paid on your home loan from your taxable income." },
  { q: "What about the principal amount?", a: "Principal repayment is covered under Section 80C. We captured this in the 80C step earlier." },
  { q: "Why does ownership matter?", a: "You can only claim the home loan interest deduction if you are an owner or co-owner of the property." }
]

export default function S11_HomeLoan(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function handleNext() {
    if (data.hasHomeLoan === null) {
      setErrors({ hasHomeLoan: 'Please select Yes or No' })
      return
    }
    setErrors({})
    goNext()
  }

  return (
    <StepWrapper {...props} stepName="Home Loan">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏡</div>
        <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Deductions</div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-6">
        Are you paying off a home loan?
      </h2>

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => { update({ hasHomeLoan: true }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasHomeLoan === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasHomeLoan: false, loanOwnership: null, homeLoanInterest: '' }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasHomeLoan === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              No
            </button>
          </div>
          {errors.hasHomeLoan && <p className="text-sm text-red-600">Please select Yes or No.</p>}
        </div>

        {data.hasHomeLoan && (
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 reveal space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Who owns the property? <span className="text-red-500">*</span></label>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${data.loanOwnership === 'own' ? 'border-indigo-500 bg-white shadow-sm' : 'border-gray-200 bg-white/50 hover:bg-white'}`}>
                  <input type="radio" name="ownership" checked={data.loanOwnership === 'own'} onChange={() => update({ loanOwnership: 'own' })} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-medium text-gray-800">I am the sole owner</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${data.loanOwnership === 'joint' ? 'border-indigo-500 bg-white shadow-sm' : 'border-gray-200 bg-white/50 hover:bg-white'}`}>
                  <input type="radio" name="ownership" checked={data.loanOwnership === 'joint'} onChange={() => update({ loanOwnership: 'joint' })} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-medium text-gray-800">I am a joint owner</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${data.loanOwnership === 'other' ? 'border-amber-400 bg-amber-50 shadow-sm' : 'border-gray-200 bg-white/50 hover:bg-white'}`}>
                  <input type="radio" name="ownership" checked={data.loanOwnership === 'other'} onChange={() => update({ loanOwnership: 'other', homeLoanInterest: '' })} className="text-amber-600 focus:ring-amber-500" />
                  <span className="text-sm font-medium text-gray-800">I pay the EMI but don't own the property</span>
                </label>
              </div>
            </div>

            {data.loanOwnership === 'other' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800 reveal">
                <strong>Important:</strong> You cannot claim home loan tax benefits unless you are an owner or co-owner of the property, even if you pay the EMIs.
              </div>
            )}

            {(data.loanOwnership === 'own' || data.loanOwnership === 'joint') && (
              <div className="reveal">
                <FrequencyInput
                  id="hl_int"
                  label="Interest Paid"
                  value={data.homeLoanInterest}
                  onChange={val => update({ homeLoanInterest: val })}
                  hint="Check your home loan certificate for the 'Interest' component."
                />
                
                {Number(data.homeLoanInterest) > 200000 && (
                  <div className="mt-2 text-xs text-indigo-700 bg-indigo-100/50 p-2 rounded">
                    Engine will automatically cap this deduction at ₹2,00,000 as per Section 24B rules.
                  </div>
                )}
              </div>
            )}
            
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

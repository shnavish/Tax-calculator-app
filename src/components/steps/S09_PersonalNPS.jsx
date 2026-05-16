import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "Is this different from Employer NPS?", a: "Yes. Employer NPS (80CCD(2)) is contributed by your company. Personal NPS (80CCD(1B)) is money you voluntarily invest from your own pocket." },
  { q: "What is the maximum benefit?", a: "You can claim an additional ₹50,000 deduction under 80CCD(1B) over and above the ₹1.5L limit of 80C." }
]

export default function S09_PersonalNPS(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function handleNext() {
    if (data.hasPersonalNPS === null) {
      setErrors({ hasPersonalNPS: 'Please select Yes or No' })
      return
    }
    if (data.hasPersonalNPS && !data.personalNPS) {
      setErrors({ personalNPS: 'Amount is required' })
      return
    }
    setErrors({})
    goNext()
  }

  return (
    <StepWrapper {...props} stepName="Personal NPS">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📈</div>
        <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Deductions</div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-6">
        Do you invest in NPS on your own?
      </h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voluntary contribution to National Pension System (Tier 1) <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => { update({ hasPersonalNPS: true }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasPersonalNPS === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasPersonalNPS: false, personalNPS: '' }); setErrors({}) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasPersonalNPS === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              No
            </button>
          </div>
          {errors.hasPersonalNPS && <p className="text-sm text-red-600">Please select Yes or No.</p>}
        </div>

        {data.hasPersonalNPS && (
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 reveal space-y-4">
            <FrequencyInput
              id="pnps"
              label="Contribution Amount"
              value={data.personalNPS}
              onChange={val => { update({ personalNPS: val }); setErrors({}) }}
              required
            />
            {errors.personalNPS && <p className="text-sm text-red-600 mt-1">{errors.personalNPS}</p>}
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-green-800 mb-0.5">Extra ₹50,000 Deduction</p>
              <p className="text-[11px] text-green-700">This investment qualifies for Section 80CCD(1B), which provides an exclusive tax deduction independent of your 80C limit.</p>
            </div>
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

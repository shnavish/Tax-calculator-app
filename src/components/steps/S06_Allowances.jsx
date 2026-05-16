import { useRef } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "What is Professional Tax?", a: "It's a state-level tax deducted from your salary. Usually around ₹200/month or ₹2,500/year." },
  { q: "What is Employer NPS (80CCD(2))?", a: "This is when your employer contributes to your NPS account. It is fully exempt up to 14% of your Basic Salary." }
]

export default function S06_Allowances(props) {
  const { data, update, goNext } = props
  const faqRef = useRef(null)

  function handleNext() {
    goNext()
  }

  return (
    <StepWrapper {...props} stepName="Allowances">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">💼</div>
        <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Allowances</div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-6">
        Any other common deductions?
      </h2>

      <div className="space-y-6 mb-8">
        
        {/* Professional Tax */}
        <div className={`p-4 rounded-xl border-2 transition-all ${data.hasProfTax ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                checked={data.hasProfTax}
                onChange={e => update({ hasProfTax: e.target.checked, professionalTax: e.target.checked ? data.professionalTax : '' })}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Professional Tax (PT)</div>
              <div className="text-xs text-gray-500 mt-0.5">Deducted directly from salary (Max ₹2,500/yr)</div>
            </div>
          </label>
          
          {data.hasProfTax && (
            <div className="mt-4 ml-8 reveal">
              <FrequencyInput
                id="pt"
                label="Professional Tax Amount"
                value={data.professionalTax}
                onChange={val => update({ professionalTax: val })}
              />
            </div>
          )}
        </div>

        {/* Employer NPS */}
        <div className={`p-4 rounded-xl border-2 transition-all ${data.hasEmployerNPS ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                checked={data.hasEmployerNPS}
                onChange={e => update({ hasEmployerNPS: e.target.checked, employerNPS: e.target.checked ? data.employerNPS : '' })}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Employer NPS Contribution</div>
              <div className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded uppercase tracking-wide inline-block mb-1 ml-2">Section 80CCD(2)</div>
              <div className="text-xs text-gray-500 mt-0.5">When your company contributes to your NPS</div>
            </div>
          </label>
          
          {data.hasEmployerNPS && (
            <div className="mt-4 ml-8 reveal">
              <FrequencyInput
                id="enps"
                label="Employer Contribution"
                value={data.employerNPS}
                onChange={val => update({ employerNPS: val })}
              />
              <div className="mt-2 bg-white/60 p-2 rounded text-[11px] text-gray-600">
                Note: Engine limits this automatically to 14% of Basic Salary.
              </div>
            </div>
          )}
        </div>

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

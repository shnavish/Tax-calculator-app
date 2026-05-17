import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import FrequencyInput from '../FrequencyInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "What is Section 80D?", a: "It provides deductions for medical insurance premiums and preventive health check-ups." },
  { q: "What are the limits?", a: "Up to ₹25,000 for self/family, and an additional ₹25,000 for parents. If parents are senior citizens (60+), the limit for them increases to ₹50,000." },
  { q: "Can I include my employer's group insurance?", a: "No. You can only claim premiums that you pay out of your own pocket (or are deducted from your salary, though rare)." }
]

export default function S10_MedicalInsurance(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function handleNext() {
    goNext()
  }

  return (
    <StepWrapper {...props} stepName="Medical Insurance">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏥</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Deductions</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-6">
        Do you pay for health insurance?
      </h2>

      <div className="space-y-6 mb-8">
        
        {/* Self/Family Insurance */}
        <div className={`p-4 rounded-xl border-2 transition-all ${data.hasSelfInsurance ? 'border-indigo-600 bg-indigo-900/30' : 'border-slate-700 bg-slate-900 hover:border-gray-300'}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                checked={data.hasSelfInsurance || false}
                onChange={e => update({ hasSelfInsurance: e.target.checked, selfInsurancePremium: e.target.checked ? data.selfInsurancePremium : '' })}
                className="w-5 h-5 rounded border-slate-600 text-indigo-400 focus:ring-indigo-500"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white">For Self, Spouse & Children</div>
              <div className="text-xs text-slate-500 mt-0.5">Premiums you pay for your own family unit</div>
            </div>
          </label>
          
          {data.hasSelfInsurance && (
            <div className="mt-4 ml-8 reveal">
              <FrequencyInput
                id="self_ins"
                label="Premium Amount"
                value={data.selfInsurancePremium}
                onChange={val => update({ selfInsurancePremium: val })}
              />
            </div>
          )}
        </div>

        {/* Parents Insurance */}
        <div className={`p-4 rounded-xl border-2 transition-all ${data.hasParentInsurance ? 'border-indigo-600 bg-indigo-900/30' : 'border-slate-700 bg-slate-900 hover:border-gray-300'}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                checked={data.hasParentInsurance || false}
                onChange={e => update({ hasParentInsurance: e.target.checked, parentInsurancePremium: e.target.checked ? data.parentInsurancePremium : '', parentsAbove60: e.target.checked ? data.parentsAbove60 : null })}
                className="w-5 h-5 rounded border-slate-600 text-indigo-400 focus:ring-indigo-500"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white">For Parents</div>
              <div className="text-xs text-slate-500 mt-0.5">Premiums you pay for your parents' insurance</div>
            </div>
          </label>
          
          {data.hasParentInsurance && (
            <div className="mt-4 ml-8 reveal space-y-4">
              <FrequencyInput
                id="parent_ins"
                label="Premium Amount"
                value={data.parentInsurancePremium}
                onChange={val => update({ parentInsurancePremium: val })}
              />
              
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-3 rounded-lg border border-slate-700 shadow-md shadow-black/20">
                  <input
                    type="checkbox"
                    checked={data.parentsAbove60 || false}
                    onChange={e => update({ parentsAbove60: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-600 text-indigo-400 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-slate-300">Are any of your parents aged 60 or above?</span>
                </label>
                <p className="text-[10px] text-slate-500 mt-1 ml-1">Checking this increases the limit from ₹25,000 to ₹50,000.</p>
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

import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import CommonQuestions from '../CommonQuestions'

const AGE_OPTIONS = [
  { value: 'below60', label: 'Below 60 years', tag: null, description: 'Basic exemption: ₹2,50,000 under old regime' },
  { value: 'senior', label: '60 to 79 years', tag: 'Senior Citizen', description: 'Basic exemption: ₹3,00,000 under old regime' },
  { value: 'superSenior', label: '80 years or above', tag: 'Super Senior Citizen', description: 'Basic exemption: ₹5,00,000 under old regime' }
]

const questions = [
  { q: "Why does age matter?", a: "Under the old regime, senior citizens get a higher basic exemption limit (tax-free income). Under the new regime, the basic exemption is the same for all ages." },
  { q: "I turn 60 this year. What should I select?", a: "If you complete 60 years of age at any time during FY 2025-26 (i.e., on or before 31st March 2026), select '60 to 79 years'." },
  { q: "Does the new regime have age benefits?", a: "No. The new regime does not differentiate based on age. It has a flat basic exemption limit for everyone." }
]

export default function S03_AgeGroup(props) {
  const { data, update, goNext } = props
  const [error, setError] = useState(false)
  const faqRef = useRef(null)

  function handleNext() {
    if (!data.ageGroup) {
      setError(true)
      return
    }
    goNext()
  }

  function handleSelect(val) {
    update({ ageGroup: val })
    setError(false)
  }

  return (
    <StepWrapper {...props} stepName="Your Age Group">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🎂</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">About You</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-6">
        Which age group do you fall in?
      </h2>
      
      <div className="space-y-3 mb-8" role="radiogroup">
        {AGE_OPTIONS.map(opt => {
          const selected = data.ageGroup === opt.value
          return (
            <div 
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selected 
                  ? 'border-indigo-600 bg-indigo-900/30' 
                  : 'border-slate-700 bg-slate-900 hover:border-gray-300 hover:bg-slate-800'
              }`}
              role="radio"
              aria-checked={selected}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${selected ? 'text-indigo-900' : 'text-white'}`}>
                      {opt.label}
                    </span>
                    {opt.tag && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selected ? 'bg-indigo-200 text-indigo-800' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {opt.tag}
                      </span>
                    )}
                  </div>
                  <div className={`text-xs ${selected ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {opt.description}
                  </div>
                </div>
                <div className={`w-5 h-5 mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                  selected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-600 bg-slate-900'
                }`}>
                  {selected && <div className="w-2 h-2 rounded-full bg-slate-900"></div>}
                </div>
              </div>
            </div>
          )
        })}
        {error && <p className="text-sm text-red-600 mt-2" role="alert">Please select your age group.</p>}
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

import { useRef } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import CommonQuestions from '../CommonQuestions'
import { calc80CTotal } from '../../utils'

const OPTIONS_80C = [
  { id: 'epf', label: 'EPF / VPF', desc: 'Employee Provident Fund' },
  { id: 'ppf', label: 'PPF', desc: 'Public Provident Fund' },
  { id: 'lic', label: 'Life Insurance', desc: 'Premium paid for self/family' },
  { id: 'elss', label: 'ELSS Funds', desc: 'Tax saving mutual funds' },
  { id: 'tuition', label: 'Tuition Fees', desc: "For children's education" },
  { id: 'homeLoanPrincipal', label: 'Home Loan', desc: 'Principal repayment only' },
  { id: 'nsc', label: 'NSC / Tax Saving FD', desc: '5-year lock-in' }
]

const questions = [
  { q: "What is Section 80C?", a: "It is the most popular tax deduction under the Old Regime, allowing you to reduce your taxable income by up to ₹1.5 Lakh." },
  { q: "Where can I find my EPF contribution?", a: "Your salary slip will show the monthly PF deduction. Multiply it by 12. Do NOT include employer's contribution here." }
]

export default function S08_Deductions80C(props) {
  const { data, update, goNext } = props
  const faqRef = useRef(null)

  const items = data.has80CItems || []
  
  function toggleItem(id) {
    if (items.includes(id)) {
      update({ 
        has80CItems: items.filter(x => x !== id),
        investments80C: { ...data.investments80C, [id]: '' }
      })
    } else {
      update({ has80CItems: [...items, id] })
    }
  }

  const total80C = calc80CTotal(data)
  const isCapped = total80C >= 150000

  return (
    <StepWrapper {...props} stepName="80C Deductions">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🛡️</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Deductions</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-2">
        Let's look at Section 80C
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Select the investments you have made this year.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {OPTIONS_80C.map(opt => {
          const isSelected = items.includes(opt.id)
          return (
            <div 
              key={opt.id}
              className={`rounded-xl border-2 transition-all overflow-hidden ${isSelected ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-700 bg-slate-900 hover:border-gray-300'}`}
            >
              <div 
                onClick={() => toggleItem(opt.id)}
                className="p-3.5 flex items-start gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-5 h-5 rounded border-slate-600 text-indigo-400 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-white'}`}>{opt.label}</div>
                  <div className="text-xs text-slate-500">{opt.desc}</div>
                </div>
              </div>

              {isSelected && (
                <div className="px-4 pb-4 pt-1 reveal border-t border-indigo-800 bg-indigo-50/50">
                  <NumberInput
                    id={opt.id}
                    label="Annual Amount"
                    value={data.investments80C[opt.id]}
                    onChange={val => update({ investments80C: { ...data.investments80C, [opt.id]: val } })}
                    placeholder="0"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {total80C > 0 && (
        <div className={`mb-8 px-4 py-3 rounded-xl border flex items-center justify-between ${isCapped ? 'bg-green-900/30 border-green-200' : 'bg-indigo-900/30 border-indigo-200'}`}>
          <div>
            <div className={`text-xs font-bold uppercase tracking-wide ${isCapped ? 'text-green-700' : 'text-indigo-400'}`}>
              Total 80C Declared
            </div>
            {isCapped && <div className="text-[10px] text-green-400 mt-0.5">Max cap of ₹1.5L reached!</div>}
          </div>
          <div className={`text-xl font-black ${isCapped ? 'text-green-700' : 'text-indigo-400'}`}>
            ₹{total80C.toLocaleString('en-IN')}
          </div>
        </div>
      )}

      <button 
        onClick={props.goNext}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Continue →
      </button>

      <CommonQuestions ref={faqRef} questions={questions} />
    </StepWrapper>
  )
}

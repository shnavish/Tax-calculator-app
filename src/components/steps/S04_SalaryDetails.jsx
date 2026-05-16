import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import FrequencyInput from '../FrequencyInput'
import ConfusedLink from '../ConfusedLink'
import CommonQuestions from '../CommonQuestions'
import { toNum } from '../../utils'

const questions = [
  { q: "What is the difference between CTC, Basic, and Take-home?", a: "CTC (Cost to Company) is the total amount your company spends on you. Basic Salary is a core component, usually 40-50% of your CTC. Take-home is what actually hits your bank account after EPF, TDS, and other deductions." },
  { q: "Why use take-home salary?", a: "It's the easiest number to verify from your bank statements. We will add back standard deductions to calculate your gross taxable income accurately." },
  { q: "Where do I find my Basic Pay?", a: "It's clearly listed on your monthly salary slip. Look for 'Basic' or 'Basic Salary' under the Earnings column." },
  { q: "Should I include my variable pay here?", a: "No. Only enter your fixed monthly salary components here. You'll enter variable pay and bonuses below." },
  { q: "I don't get a monthly bonus. Should I enter it?", a: "If you get a bonus only once or twice a year, select 'Per year' in the frequency toggle and enter the total annual bonus amount." }
]

export default function S04_SalaryDetails(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  const th = toNum(data.takeHomeSalaryMonthly)
  const basic = toNum(data.basicSalaryMonthly)
  const bonus = data.hasBonus ? toNum(data.bonus) : 0
  
  const annualTakeHome = th * 12
  const showBasicWarning = basic > th && th > 0
  const showSurchargeWarning = annualTakeHome > 5000000

  function handleNext() {
    const newErrs = {}
    if (!data.takeHomeSalaryMonthly) newErrs.th = 'Required'
    if (!data.basicSalaryMonthly) newErrs.basic = 'Required'
    if (data.hasBonus === null) newErrs.hasBonus = 'Please select Yes or No'
    if (data.hasBonus && !data.bonus) newErrs.bonus = 'Required'

    setErrors(newErrs)
    if (Object.keys(newErrs).length === 0) {
      goNext()
    }
  }

  return (
    <StepWrapper {...props} stepName="Salary Details">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">💰</div>
        <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Your Salary</div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-6">
        What does your salary look like?
      </h2>

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            id="th"
            label="Take-home Salary"
            value={data.takeHomeSalaryMonthly}
            onChange={val => { update({ takeHomeSalaryMonthly: val }); setErrors(e => ({...e, th: null})) }}
            hint="The amount credited to your bank account each month — not your CTC or gross salary."
            required
          />
          <div>
            <NumberInput
              id="basic"
              label="Basic Pay"
              value={data.basicSalaryMonthly}
              onChange={val => { update({ basicSalaryMonthly: val }); setErrors(e => ({...e, basic: null})) }}
              required
            />
            <div className="mt-1.5"><ConfusedLink faqRef={faqRef} label="Where is my basic pay?" /></div>
          </div>
        </div>

        {errors.th && <p className="text-sm text-red-600">Take-home salary is required.</p>}
        {errors.basic && <p className="text-sm text-red-600">Basic pay is required.</p>}

        {showBasicWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 reveal">
            <p className="text-sm text-amber-800 font-medium mb-1">Wait, is your basic pay higher than your take-home?</p>
            <p className="text-xs text-amber-700">Basic pay is usually 40-50% of your total salary. Please double-check your salary slip.</p>
          </div>
        )}

        {showSurchargeWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 reveal">
            <p className="text-sm text-amber-800 font-medium mb-1">High Income Surcharge Warning</p>
            <p className="text-xs text-amber-700">Incomes above ₹50 lakh attract a surcharge. This calculator does not handle surcharge. Please consult a CA.</p>
          </div>
        )}

        {annualTakeHome > 0 && !data.hasBonus && (
          <div className="reveal px-4 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
            <div className="text-sm font-medium text-indigo-900">Total Annual Take-home</div>
            <div className="text-lg font-bold text-indigo-700">₹{(annualTakeHome).toLocaleString('en-IN')}</div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you get any extra money apart from your fixed monthly salary? <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">Like a yearly bonus, performance incentive, or variable pay.</p>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { update({ hasBonus: true }); setErrors(e => ({...e, hasBonus: null})) }}
                className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasBonus === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { update({ hasBonus: false, bonus: '' }); setErrors(e => ({...e, hasBonus: null, bonus: null})) }}
                className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasBonus === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                No
              </button>
            </div>
            {errors.hasBonus && <p className="text-sm text-red-600 mt-2">Please select Yes or No.</p>}
          </div>

          {data.hasBonus === true && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 reveal space-y-4">
              <FrequencyInput
                id="bonus"
                label="How much bonus do you receive?"
                value={data.bonus}
                onChange={val => { update({ bonus: val }); setErrors(e => ({...e, bonus: null})) }}
                required
              />
              {errors.bonus && <p className="text-sm text-red-600 mt-1">Bonus amount is required.</p>}

              <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                <p className="text-xs font-semibold text-gray-700 mb-1">Not sure of the exact amount?</p>
                <p className="text-xs text-gray-500">Just enter an estimate for now. You can always change it later.</p>
              </div>
              
              <p className="text-[11px] text-blue-700">Don't include: your fixed monthly salary, stock options (RSUs), or reimbursements.</p>
            </div>
          )}

          {data.hasBonus === false && (
            <div className="reveal px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 text-center">
              Got it — we'll use only your fixed monthly salary.
            </div>
          )}

          {data.hasBonus && annualTakeHome > 0 && bonus > 0 && (
            <div className="mt-4 reveal px-4 py-2.5 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between">
              <div className="text-sm font-medium text-green-900">Total Take-home + Bonus</div>
              <div className="text-lg font-bold text-green-700">₹{(annualTakeHome + bonus).toLocaleString('en-IN')}</div>
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

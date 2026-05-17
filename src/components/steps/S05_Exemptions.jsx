import { useRef, useState } from 'react'
import StepWrapper from '../StepWrapper'
import NumberInput from '../NumberInput'
import CommonQuestions from '../CommonQuestions'

const questions = [
  { q: "What is a Metro city for HRA?", a: "For tax purposes, only Delhi, Mumbai, Kolkata, and Chennai are considered Metro cities (50% HRA exemption). All other cities, including Bangalore and Hyderabad, are Non-Metro (40%)." },
  { q: "I pay rent to my parents, can I claim HRA?", a: "Yes, provided they actually own the property and you have proof of payment (rent receipts, bank transfers). They will need to declare this rent as income on their tax return." }
]

export default function S05_Exemptions(props) {
  const { data, update, goNext } = props
  const [errors, setErrors] = useState({})
  const faqRef = useRef(null)

  function handleNext() {
    const newErrs = {}
    if (data.paysRent === null) newErrs.paysRent = 'Please select Yes or No'
    if (data.paysRent) {
      if (!data.monthlyRent) newErrs.monthlyRent = 'Required'
      if (!data.cityType) newErrs.cityType = 'Required'
    }
    
    if (data.hasHRA === null) newErrs.hasHRA = 'Please select Yes or No'
    if (data.hasHRA && !data.hraMonthly) newErrs.hraMonthly = 'Required'

    setErrors(newErrs)
    if (Object.keys(newErrs).length === 0) goNext()
  }

  return (
    <StepWrapper {...props} stepName="HRA & Rent">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏠</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Exemptions</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-6">
        Do you live in a rented house?
      </h2>

      <div className="space-y-8 mb-8">
        <div>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => { update({ paysRent: true }); setErrors(e => ({...e, paysRent: null})) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.paysRent === true ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ paysRent: false, monthlyRent: '', cityType: null }); setErrors(e => ({...e, paysRent: null, monthlyRent: null, cityType: null})) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.paysRent === false ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              No
            </button>
          </div>
          {errors.paysRent && <p className="text-sm text-red-600">Please select Yes or No.</p>}

          {data.paysRent && (
            <div className="bg-indigo-50/50 border border-indigo-800 rounded-xl p-4 reveal space-y-5 mt-4">
              <div>
                <NumberInput
                  id="rent"
                  label="How much rent do you pay?"
                  value={data.monthlyRent}
                  onChange={val => { update({ monthlyRent: val }); setErrors(e => ({...e, monthlyRent: null})) }}
                  hint="Monthly rent amount"
                  required
                />
                {errors.monthlyRent && <p className="text-sm text-red-600 mt-1">Rent amount is required.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">City type <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { update({ cityType: 'metro' }); setErrors(e => ({...e, cityType: null})) }}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-semibold transition-colors ${data.cityType === 'metro' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-600 bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
                  >
                    Metro (50%)
                  </button>
                  <button
                    onClick={() => { update({ cityType: 'nonMetro' }); setErrors(e => ({...e, cityType: null})) }}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-semibold transition-colors ${data.cityType === 'nonMetro' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-600 bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
                  >
                    Non-Metro (40%)
                  </button>
                </div>
                {errors.cityType && <p className="text-sm text-red-600 mt-1">City type is required.</p>}
              </div>

              {(Number(data.monthlyRent) * 12) > 100000 && (
                <div className="bg-amber-900/30 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-800">Note: Since annual rent exceeds ₹1,00,000, you will need your landlord's PAN to claim HRA exemption.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-800">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Does your salary include HRA (House Rent Allowance)? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => { update({ hasHRA: true }); setErrors(e => ({...e, hasHRA: null})) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasHRA === true ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              Yes
            </button>
            <button
              onClick={() => { update({ hasHRA: false, hraMonthly: '' }); setErrors(e => ({...e, hasHRA: null, hraMonthly: null})) }}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 font-semibold transition-colors ${data.hasHRA === false ? 'border-indigo-600 bg-indigo-900/30 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-gray-300 hover:bg-slate-800'}`}
            >
              No
            </button>
          </div>
          {errors.hasHRA && <p className="text-sm text-red-600">Please select Yes or No.</p>}

          {data.hasHRA && (
            <div className="mt-4 reveal">
              <NumberInput
                id="hra"
                label="HRA Received (Monthly)"
                value={data.hraMonthly}
                onChange={val => { update({ hraMonthly: val }); setErrors(e => ({...e, hraMonthly: null})) }}
                hint="Check your salary slip for the HRA component"
                required
              />
              {errors.hraMonthly && <p className="text-sm text-red-600 mt-1">HRA amount is required.</p>}
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

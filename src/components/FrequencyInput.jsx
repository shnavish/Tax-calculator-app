import { useState } from 'react'

export default function FrequencyInput({ id, label, value, onChange, placeholder = '0', hint, note, required = false, max, prefix = '₹' }) {
  const [freq, setFreq] = useState('annual')
  
  const annualValue = Number(value) || 0
  const displayValue = freq === 'monthly' ? Math.round(annualValue / 12) : annualValue
  const isValid = value !== '' && value !== null && value !== undefined && annualValue > 0

  function formatINR(val) {
    if (!val) return ''
    return Number(val).toLocaleString('en-IN')
  }

  function handleChange(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') {
      onChange('')
    } else {
      const num = Number(raw)
      onChange(freq === 'monthly' ? num * 12 : num)
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex rounded-full border border-gray-200 overflow-hidden bg-gray-50 p-0.5 gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setFreq('monthly')}
            className={`px-3 py-1 text-xs font-semibold transition-all rounded-full ${freq === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setFreq('annual')}
            className={`px-3 py-1 text-xs font-semibold transition-all rounded-full ${freq === 'annual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Per year
          </button>
        </div>
      </div>

      <div className="relative rounded-xl">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 text-sm font-medium">{prefix}</span>
          </div>
        )}
        <input
          type="text"
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          value={formatINR(displayValue)}
          onChange={handleChange}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`block w-full rounded-xl border py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder:text-gray-400 transition-colors ${
            isValid ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
          } ${prefix ? 'pl-8 pr-9' : 'px-3 pr-9'}`}
        />
        {isValid && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      
      {freq === 'monthly' && annualValue > 0 && (
        <div className="text-xs text-indigo-600 font-medium reveal">
          = ₹{annualValue.toLocaleString('en-IN')} per year (auto-calculated)
        </div>
      )}

      {note && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">
          {note}
        </div>
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-gray-400">
          {hint}
        </p>
      )}
    </div>
  )
}

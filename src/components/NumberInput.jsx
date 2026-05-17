export default function NumberInput({ id, label, value, onChange, placeholder = '0', hint, note, required = false, max, prefix = '₹' }) {
  const isValid = value !== '' && value !== null && value !== undefined && Number(value) > 0

  function formatINR(val) {
    if (!val) return ''
    return Number(val).toLocaleString('en-IN')
  }

  function handleChange(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') {
      onChange('')
    } else {
      onChange(Number(raw))
    }
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-xl">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 text-sm font-medium">{prefix}</span>
          </div>
        )}
        <input
          type="text"
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          value={formatINR(value)}
          onChange={handleChange}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`block w-full rounded-xl border py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder:text-gray-400 transition-colors ${
            isValid ? 'border-green-300 bg-green-50/30' : 'border-slate-700'
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
      {note && (
        <div className="text-xs text-amber-700 bg-amber-900/30 border border-amber-200 rounded-md px-2 py-1">
          {note}
        </div>
      )}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  )
}

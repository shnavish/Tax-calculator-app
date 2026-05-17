import { forwardRef, useImperativeHandle, useState, useRef } from 'react'

const CommonQuestions = forwardRef(({ questions }, ref) => {
  const [open, setOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)
  
  const containerRef = useRef(null)

  useImperativeHandle(ref, () => ({
    openAndScroll: () => {
      setOpen(true)
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 80)
    }
  }))

  if (!questions || questions.length === 0) return null

  return (
    <div ref={containerRef} className="border border-slate-700 rounded-xl overflow-hidden mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-900 hover:bg-slate-800 transition-colors text-left"
      >
        <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Common questions about this
        </span>
        <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="divide-y divide-gray-100 bg-slate-900">
          {questions.map((q, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between px-4 py-3 text-left hover:bg-slate-800 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-300 pr-4 leading-snug">{q.q}</span>
                  <svg className={`flex-shrink-0 mt-0.5 w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 reveal">
                    <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{q.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

export default CommonQuestions

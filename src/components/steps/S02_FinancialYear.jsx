import StepWrapper from '../StepWrapper'

export default function S02_FinancialYear(props) {
  return (
    <StepWrapper {...props} stepName="Financial Year">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📅</div>
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Financial Year</div>
      </div>
      
      <h2 className="text-xl font-bold text-white leading-tight mb-6">
        Which financial year are you calculating tax for?
      </h2>
      
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-indigo-900/30 border-2 border-indigo-600 rounded-xl cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-indigo-900">FY 2025-26</div>
              <div className="text-xs text-indigo-400 mt-0.5">April 2025 to March 2026</div>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-indigo-600 bg-indigo-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">Currently, this calculator is only updated with the latest rules for FY 2025-26 (Assessment Year 2026-27).</p>
      </div>

      <button 
        onClick={props.goNext}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Continue →
      </button>
    </StepWrapper>
  )
}

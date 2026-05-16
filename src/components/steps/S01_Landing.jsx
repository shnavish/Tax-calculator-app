export default function S01_Landing({ goNext }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900 tracking-tight">TaxClarity</span>
        </div>
        <div className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">FY 2025-26</div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 w-fit mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Know. Compare. Save.
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Find out <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">which tax regime</span> saves you more money this year.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Answer a few simple questions about your salary and expenses. We'll compare both tax regimes and show you which one saves you more money — with a clear rupee-by-rupee estimate.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <span className="text-lg">⏱</span> 2 min
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <span className="text-lg">🔒</span> 100% Free
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <span className="text-lg">🛡</span> Private
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button onClick={goNext} className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-7 rounded-2xl text-sm transition-colors shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2">
                Start calculation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button onClick={goNext} className="text-gray-500 hover:text-gray-900 font-semibold py-3.5 px-7 rounded-2xl text-sm transition-colors flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                See how it works
              </button>
            </div>
            
            <p className="mt-4 text-xs text-gray-400">Built for salaried individuals only · FY 2025-26</p>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-indigo-100 rounded-3xl blur-3xl opacity-40 scale-95 translate-y-4"></div>
            <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-bold text-gray-900">Your Tax Summary</div>
                <div className="text-[10px] font-bold tracking-wider text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded uppercase">Example</div>
              </div>
              <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5 mb-6">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <div className="text-xs font-bold text-green-800">New Regime saves you ₹18,540</div>
                  <div className="text-xs text-green-600 mt-0.5">vs Old Regime (₹1,02,400)</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Best
                  </div>
                  <div className="text-sm font-semibold text-gray-900">New Regime</div>
                  <div className="text-xl font-black text-indigo-700 mt-1">₹83,860</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-75">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                    Alternative
                  </div>
                  <div className="text-sm font-semibold text-gray-500">Old Regime</div>
                  <div className="text-xl font-black text-gray-600 mt-1">₹1,02,400</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 lg:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl mb-3">⚖️</div>
            <div className="text-sm font-bold text-gray-900 mb-1">Old vs New Regime</div>
            <div className="text-xs text-gray-500 leading-relaxed">Instantly compares both options side-by-side.</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl mb-3">💰</div>
            <div className="text-sm font-bold text-gray-900 mb-1">Exact Savings</div>
            <div className="text-xs text-gray-500 leading-relaxed">See the precise rupee amount you can save.</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-3">🧾</div>
            <div className="text-sm font-bold text-gray-900 mb-1">Refund or Tax Due</div>
            <div className="text-xs text-gray-500 leading-relaxed">Factors in your TDS to show refund/payable status.</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl mb-3">🤓</div>
            <div className="text-sm font-bold text-gray-900 mb-1">Plain English</div>
            <div className="text-xs text-gray-500 leading-relaxed">No CA jargon. Simple questions anyone can answer.</div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Private & Secure · All calculation happens in your browser
          </div>
          <div className="text-xs text-gray-400">Not official tax advice.</div>
        </div>
      </footer>
    </div>
  )
}

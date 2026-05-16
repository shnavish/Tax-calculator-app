import { fmt } from '../utils'

// Icons as simple SVG components for cleanliness
const CheckCircle = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const Shield = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

export default function TaxSummaryView({ data, results, reset, editStep }) {
  const { newRegime, oldRegime, recommended, savings, tds } = results

  const isRefund = tds.type === 'refund'
  const isPayable = tds.type === 'payable'

  // Hero Data - Upgraded to richer, premium deep gradients
  let heroTheme = {
    bg: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black',
    title: 'Your taxes are perfectly settled.',
    iconColor: 'text-slate-400'
  }
  if (isRefund) {
    heroTheme = {
      bg: 'bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#059669]', // Deep premium emerald
      title: `You'll get a ${fmt(tds.amount)} refund!`,
      iconColor: 'text-emerald-200'
    }
  } else if (isPayable) {
    heroTheme = {
      bg: 'bg-gradient-to-br from-[#7F1D1D] via-[#991B1B] to-[#B91C1C]', // Deep premium crimson
      title: `You need to pay ${fmt(tds.amount)}`,
      iconColor: 'text-rose-200'
    }
  }

  const primaryRegime = recommended === 'new' ? newRegime : oldRegime
  const secondaryRegime = recommended === 'new' ? oldRegime : newRegime
  const primaryName = recommended === 'new' ? 'New Tax Regime' : 'Old Tax Regime'
  const secondaryName = recommended === 'new' ? 'Old Tax Regime' : 'New Tax Regime'

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-lg font-black text-slate-900 tracking-tight">TaxClarity</span>
        </div>
        <button onClick={reset} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Start Over
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-8">

        {/* 1. HERO SECTION - Glassmorphism & Depth */}
        <section className={`rounded-[2rem] ${heroTheme.bg} p-8 sm:p-12 text-white shadow-2xl shadow-emerald-900/20 overflow-hidden relative`}>
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
             <svg width="500" height="500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.39-.97-2.43-1.92h-1.7c.05 1.6 1.14 2.82 2.76 3.19V19h2.32v-1.66c1.69-.32 2.91-1.35 2.91-3.02 0-2.31-1.89-2.88-3.48-3.18z"/></svg>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20 shadow-sm">
              <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Best for you
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3 drop-shadow-sm">
              {heroTheme.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium mb-12">
              Based on FY 2025–26 under the {primaryName}
            </p>

            <div className="flex flex-wrap lg:flex-nowrap gap-6 lg:gap-0 lg:divide-x lg:divide-white/20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
              <div className="flex-1 min-w-[200px] flex items-center gap-4 lg:pr-8">
                <div className={`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner ${heroTheme.iconColor}`}>
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{isRefund ? "Refund You'll Get" : isPayable ? "Amount Payable" : "Tax Due"}</div>
                  <div className="text-3xl font-black leading-none tracking-tight">{fmt(tds.amount)}</div>
                </div>
              </div>

              <div className="flex-1 min-w-[200px] flex items-center gap-4 lg:pl-8 lg:pr-8">
                <div className={`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner ${heroTheme.iconColor}`}>
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Final Tax Liability</div>
                  <div className="text-3xl font-black leading-none tracking-tight">{fmt(primaryRegime.totalTax)}</div>
                </div>
              </div>

              <div className="flex-1 min-w-[200px] flex items-center gap-4 lg:pl-8 lg:pr-8">
                <div className={`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner ${heroTheme.iconColor}`}>
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Annual Income</div>
                  <div className="text-3xl font-black leading-none tracking-tight">{fmt(primaryRegime.grossIncome)}</div>
                </div>
              </div>

              <div className="flex-1 min-w-[200px] flex items-center gap-4 lg:pl-8">
                <div className={`w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner ${heroTheme.iconColor}`}>
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Tax Already Paid</div>
                  <div className="text-3xl font-black leading-none tracking-tight">{fmt(results.tdsDeducted)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EXPLANATION SECTION - Refined shadow and layout */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
          <div className="flex items-center gap-4 lg:w-1/4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-tight">Why {isRefund ? "you're getting a refund" : isPayable ? "you have tax payable" : "your tax is settled"}</h2>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-10">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
              <p className="text-slate-600 font-medium">Your total tax liability is computed at <strong className="text-slate-900">{fmt(primaryRegime.totalTax)}</strong>.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
              <p className="text-slate-600 font-medium">You've already paid <strong className="text-slate-900">{fmt(results.tdsDeducted)}</strong> as TDS.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
              <p className="text-slate-600 font-medium">The difference is the final amount to be <strong className="text-slate-900">{isRefund ? 'refunded' : isPayable ? 'paid' : 'settled'}</strong>.</p>
            </div>
          </div>
        </section>

        {/* 3 & 4. REGIME DECISION & VISUAL COMPARISON */}
        <div className="pt-6">
          <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Regime Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* PRIMARY CARD (Left, ~45% width) - Premium Glow */}
            <div className="lg:col-span-5 bg-white rounded-[2rem] border-2 border-emerald-400 shadow-[0_8px_30px_rgb(52,211,153,0.15)] overflow-hidden relative flex flex-col">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-bl-xl shadow-sm">
                Recommended
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{primaryName}</h3>
                    <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 uppercase tracking-widest mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                      Best for you
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1.5">Final Tax Liability</div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">{fmt(primaryRegime.totalTax)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-1.5">{isRefund ? 'Refund You\'ll Get' : isPayable ? 'Payable Amount' : 'Settled Amount'}</div>
                    <div className="text-4xl font-black text-emerald-600 tracking-tight">{fmt(tds.amount)}</div>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-base text-slate-700 font-semibold">Lower overall tax liability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-base text-slate-700 font-semibold">{recommended === 'new' ? 'No need for investments or deductions' : 'Maximizes your declared deductions'}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex justify-between items-center group">
                  <span className="text-lg">Continue with {recommended === 'new' ? 'New' : 'Old'} Regime</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>

            {/* SECONDARY CARD (Middle, ~40% width) - Subtle & Clean */}
            <div className="lg:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{secondaryName}</h3>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">Alternative</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Final Tax</div>
                  <div className="text-2xl font-black text-rose-600">{fmt(secondaryRegime.totalTax)}</div>
                </div>
              </div>

              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Deductions Considered</div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-600 font-medium">Standard Deduction</span>
                  <span className="text-sm font-bold text-slate-900">{fmt(secondaryRegime.standardDeduction)}</span>
                </div>
                {secondaryRegime.professionalTaxDeduction > 0 && (
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600 font-medium">Professional Tax</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(secondaryRegime.professionalTaxDeduction)}</span>
                  </div>
                )}
                {secondaryRegime.employerNPSDeduction > 0 && (
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600 font-medium">Employer NPS</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(secondaryRegime.employerNPSDeduction)}</span>
                  </div>
                )}
                {secondaryRegime.deduction80C > 0 && (
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600 font-medium">80C Investments</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(secondaryRegime.deduction80C)}</span>
                  </div>
                )}
                {secondaryRegime.deduction80D > 0 && (
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-600 font-medium">80D Medical</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(secondaryRegime.deduction80D)}</span>
                  </div>
                )}
              </div>

              <div className="mt-auto">
                {savings > 0 ? (
                  <div className="bg-rose-50 text-rose-700 text-sm font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 border border-rose-100">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    You'd pay {fmt(savings)} more vs {recommended === 'new' ? 'New' : 'Old'} Regime
                  </div>
                ) : (
                  <div className="bg-slate-50 text-slate-600 text-sm font-bold py-4 px-4 rounded-xl flex items-center justify-center border border-slate-200">
                    No difference in tax liability
                  </div>
                )}
              </div>
            </div>

            {/* VISUAL COMPARISON (Right, ~25% width) - Premium Gradient Bars */}
            <div className="lg:col-span-3 bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-8 uppercase tracking-widest">Tax Comparison</h3>
              
              <div className="space-y-8 flex-1">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold text-slate-600">{primaryName}</span>
                    <span className="text-base font-black text-emerald-600">{fmt(primaryRegime.totalTax)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full" 
                      style={{ width: secondaryRegime.totalTax > 0 ? `${(primaryRegime.totalTax / secondaryRegime.totalTax) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold text-slate-600">{secondaryName}</span>
                    <span className="text-base font-black text-slate-900">{fmt(secondaryRegime.totalTax)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-rose-400 to-rose-500 h-3 rounded-full" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {savings > 0 && (
                <div className="mt-10 bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-200 shadow-[inset_0_2px_10px_rgb(52,211,153,0.1)]">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">You save</div>
                  <div className="text-4xl font-black text-emerald-600 tracking-tight">{fmt(savings)}</div>
                  <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-2">by choosing the {primaryName}</div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 5. FINAL CTA SECTION - Inverted Dark Panel */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-[2rem] p-8 md:p-10 mt-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-slate-300">
          <div className="flex items-center gap-5 text-left w-full md:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 shadow-sm border border-white/20 backdrop-blur-md">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">Ready to file and claim your {fmt(tds.amount)} {isRefund ? 'refund' : 'settlement'}?</h3>
              <p className="text-base text-slate-300 font-medium">Our experts will file your return accurately and hassle-free.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-black py-4 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
              File my return & claim {fmt(tds.amount)}
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            <button className="w-full sm:w-auto bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Summary
            </button>
            <button className="w-full sm:w-auto text-slate-300 font-bold py-4 px-4 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Talk to CA
            </button>
          </div>
        </div>

        {/* 6. TRUST SIGNALS */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-16 pb-12 px-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
               <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 leading-tight">Secure & compliant</div>
              <div className="text-xs text-slate-500 font-medium mt-1">100% secure and compliant</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 leading-tight">Accurate calculations</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Latest FY 25–26 tax slabs</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0 border border-violet-100">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 leading-tight">Expert support</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Reviewed by certified CAs</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

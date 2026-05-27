import { formatInr } from '../utils/formatCurrency'

function Header({ total, monthLabel }) {
  return (
    <header className="mb-8 text-center">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
        Student Expense Tracker
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        Your spending
      </h1>
      <p className="mt-2 text-sm font-medium text-slate-300">{monthLabel}</p>
      <div className="mt-6 rounded-2xl border border-slate-700/80 bg-slate-800/60 px-6 py-5 shadow-lg shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Total this month
        </p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight text-emerald-400 sm:text-5xl">
          {formatInr(total)}
        </p>
      </div>
    </header>
  )
}

export default Header

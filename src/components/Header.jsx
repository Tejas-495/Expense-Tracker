import { formatInr } from '../utils/formatCurrency'

function Header({ total }) {
  return (
    <header className="mb-8 text-center">
      <p className="mb-1 text-sm font-medium uppercase tracking-wider text-violet-400">
        Student Expense Tracker
      </p>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Your spending
      </h1>
      <div className="mt-6 rounded-2xl border border-slate-700/80 bg-slate-800/60 px-6 py-5 shadow-lg shadow-black/20">
        <p className="text-sm text-slate-400">Total expenses</p>
        <p className="mt-1 text-4xl font-bold text-emerald-400 sm:text-5xl">
          {formatInr(total)}
        </p>
      </div>
    </header>
  )
}

export default Header

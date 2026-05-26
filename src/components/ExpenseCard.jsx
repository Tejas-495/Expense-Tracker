import { formatInr } from '../utils/formatCurrency'

function ExpenseCard({ expense, onDelete }) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-md shadow-black/10 transition hover:border-slate-600 sm:p-5">
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-white">
          {expense.title}
        </h3>
        <p className="mt-1 text-xl font-bold text-emerald-400">
          {formatInr(expense.amount)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(expense.id)}
        className="shrink-0 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/50"
        aria-label={`Delete ${expense.title}`}
      >
        Delete
      </button>
    </article>
  )
}

export default ExpenseCard

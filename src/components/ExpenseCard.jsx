import { useState } from 'react'
import { formatInr } from '../utils/formatCurrency'

function ExpenseCard({ expense, onAddAmount, onDelete }) {
  const [extraAmount, setExtraAmount] = useState('')

  function handleAddAmount() {
    const parsedAmount = parseFloat(extraAmount)
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return
    }

    onAddAmount(expense.id, parsedAmount)
    setExtraAmount('')
  }

  return (
    <article className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-md shadow-black/10 transition hover:border-slate-600 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-white">
            {expense.title}
          </h3>
          <p className="mt-1 inline-flex rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
            {expense.category}
          </p>
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
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={extraAmount}
          onChange={(e) => setExtraAmount(e.target.value)}
          placeholder="Add amount (₹)"
          className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />
        <button
          type="button"
          onClick={handleAddAmount}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          Add to expense
        </button>
      </div>
    </article>
  )
}

export default ExpenseCard

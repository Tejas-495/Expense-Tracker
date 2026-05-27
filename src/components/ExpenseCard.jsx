import { useEffect, useState } from 'react'
import { formatInr } from '../utils/formatCurrency'
import { isValidCategory, normalizeCategory } from '../utils/category'

function formatExpenseDate(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function ExpenseCard({ expense, categories, onUpdateCategory, onAddAmount, onDelete }) {
  const [extraAmount, setExtraAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(expense.category)
  const [customCategory, setCustomCategory] = useState('')

  useEffect(() => {
    setSelectedCategory(expense.category)
  }, [expense.category])

  function handleAddAmount() {
    const parsedAmount = parseFloat(extraAmount)
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return
    }

    onAddAmount(expense.id, parsedAmount)
    setExtraAmount('')
  }

  function handleCategoryChange(value) {
    setSelectedCategory(value)
    if (value !== '__custom__') {
      onUpdateCategory(expense.id, value)
    }
  }

  function handleSaveCustomCategory() {
    if (!isValidCategory(customCategory)) {
      return
    }

    const normalizedCategory = normalizeCategory(customCategory)
    onUpdateCategory(expense.id, normalizedCategory)
    setSelectedCategory(normalizedCategory)
    setCustomCategory('')
  }

  return (
    <article className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-md shadow-black/10 transition hover:border-slate-600 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-white">
            {expense.title}
          </h3>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="rounded-xl border border-slate-600 bg-slate-900 px-2.5 py-1 text-xs font-medium text-violet-200 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="__custom__">Custom...</option>
            </select>
            {selectedCategory === '__custom__' && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="New category"
                  className="w-32 rounded-xl border border-slate-600 bg-slate-900 px-2.5 py-1 text-xs text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                />
                <button
                  type="button"
                  onClick={handleSaveCustomCategory}
                  className="rounded-xl bg-violet-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {formatExpenseDate(expense.createdAt)}
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

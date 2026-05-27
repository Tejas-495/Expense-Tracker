import { useState } from 'react'
import { detectExpenseCategory } from '../utils/category'
import { getCurrentMonthKey } from '../utils/month'

function ExpenseForm({ onAddExpense, monthLabel }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const parsedAmount = parseFloat(amount)

    if (!trimmedTitle || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return
    }

    onAddExpense({
      id: Date.now(),
      title: trimmedTitle,
      amount: parsedAmount,
      category: detectExpenseCategory(trimmedTitle),
      monthKey: getCurrentMonthKey(),
    })

    setTitle('')
    setAmount('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-slate-700/80 bg-slate-800/60 p-5 shadow-lg shadow-black/20 sm:p-6"
    >
      <h2 className="mb-1 text-lg font-semibold text-white">Add expense</h2>
      <p className="mb-4 text-sm text-slate-400">
        Saved for {monthLabel}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Coffee, Books"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900 sm:w-auto sm:px-8"
      >
        Add expense
      </button>
    </form>
  )
}

export default ExpenseForm

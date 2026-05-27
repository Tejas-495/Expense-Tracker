import ExpenseCard from './ExpenseCard'

function ExpenseList({ expenses, monthLabel, onAddToExpense, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-600 bg-slate-800/30 py-12 text-center text-slate-400">
        No matching expenses for {monthLabel}. Try changing your filters.
      </p>
    )
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">
        {monthLabel} ({expenses.length})
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <ExpenseCard
              expense={expense}
              onAddAmount={onAddToExpense}
              onDelete={onDeleteExpense}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpenseList

import { useEffect, useState } from 'react'
import { loadExpenses, saveExpenses } from './utils/expenseStorage'
import {
  filterExpensesByMonth,
  formatMonthLabel,
  getCurrentMonthKey,
} from './utils/month'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

function App() {
  const [expenses, setExpenses] = useState(loadExpenses)
  const currentMonthKey = getCurrentMonthKey()
  const monthLabel = formatMonthLabel(currentMonthKey)
  const monthlyExpenses = filterExpensesByMonth(expenses, currentMonthKey)

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const total = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  )

  function handleAddExpense(newExpense) {
    setExpenses((prev) => [newExpense, ...prev])
  }

  function handleDeleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  function handleAddToExpense(id, amountToAdd) {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? { ...expense, amount: expense.amount + amountToAdd }
          : expense,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 sm:py-12">
      <main className="mx-auto max-w-3xl">
        <Header total={total} monthLabel={monthLabel} />
        <ExpenseForm
          onAddExpense={handleAddExpense}
          monthLabel={monthLabel}
        />
        <ExpenseList
          expenses={monthlyExpenses}
          monthLabel={monthLabel}
          onAddToExpense={handleAddToExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { loadExpenses, saveExpenses } from './utils/expenseStorage'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

function App() {
  const [expenses, setExpenses] = useState(loadExpenses)

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  function handleAddExpense(newExpense) {
    setExpenses((prev) => [newExpense, ...prev])
  }

  function handleDeleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 sm:py-12">
      <main className="mx-auto max-w-3xl">
        <Header total={total} />
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App

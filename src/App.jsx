import { useEffect, useState } from 'react'
import { loadExpenses, saveExpenses } from './utils/expenseStorage'
import { EXPENSE_CATEGORIES, isValidCategory, normalizeCategory } from './utils/category'
import {
  filterExpensesByMonth,
  formatMonthLabel,
  getCurrentMonthKey,
} from './utils/month'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import ExpenseFilters from './components/ExpenseFilters'
import ExpenseList from './components/ExpenseList'

function App() {
  const [expenses, setExpenses] = useState(loadExpenses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const currentMonthKey = getCurrentMonthKey()
  const monthLabel = formatMonthLabel(currentMonthKey)
  const monthlyExpenses = filterExpensesByMonth(expenses, currentMonthKey)
  const categoryOptions = [
    ...new Set([
      ...EXPENSE_CATEGORIES,
      ...expenses
        .map((expense) => expense.category)
        .filter((category) => typeof category === 'string' && category.trim() !== ''),
    ]),
  ]

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const filteredExpenses = monthlyExpenses.filter((expense) => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const matchesSearch =
      normalizedSearch === '' ||
      expense.title.toLowerCase().includes(normalizedSearch)

    const matchesCategory =
      selectedCategory === '' || expense.category === selectedCategory

    const matchesDate = selectedDate === '' || expense.createdAt === selectedDate

    const parsedMin = minAmount === '' ? null : parseFloat(minAmount)
    const parsedMax = maxAmount === '' ? null : parseFloat(maxAmount)
    const validMin =
      parsedMin === null || Number.isNaN(parsedMin) ? null : parsedMin
    const validMax =
      parsedMax === null || Number.isNaN(parsedMax) ? null : parsedMax
    const matchesMin = validMin === null || expense.amount >= validMin
    const matchesMax = validMax === null || expense.amount <= validMax

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDate &&
      matchesMin &&
      matchesMax
    )
  })

  const total = filteredExpenses.reduce(
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

  function handleUpdateExpenseCategory(id, nextCategory) {
    if (!isValidCategory(nextCategory)) {
      return
    }

    const normalizedCategory = normalizeCategory(nextCategory)
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, category: normalizedCategory } : expense,
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
        <ExpenseFilters
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onSelectedCategoryChange={setSelectedCategory}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          minAmount={minAmount}
          onMinAmountChange={setMinAmount}
          maxAmount={maxAmount}
          onMaxAmountChange={setMaxAmount}
          categories={categoryOptions}
        />
        <ExpenseList
          expenses={filteredExpenses}
          monthLabel={monthLabel}
          categories={categoryOptions}
          onUpdateExpenseCategory={handleUpdateExpenseCategory}
          onAddToExpense={handleAddToExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App

import { initialExpenses } from '../data/initialExpenses'

const STORAGE_KEY = 'expense-tracker-expenses'

function isValidExpense(expense) {
  return (
    expense &&
    typeof expense.id === 'number' &&
    typeof expense.title === 'string' &&
    typeof expense.amount === 'number' &&
    expense.amount > 0
  )
}

export function loadExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialExpenses

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed) || !parsed.every(isValidExpense)) {
      return initialExpenses
    }

    return parsed
  } catch {
    return initialExpenses
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

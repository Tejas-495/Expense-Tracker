import { initialExpenses } from '../data/initialExpenses'
import { getCurrentMonthKey } from './month'

const STORAGE_KEY = 'expense-tracker-expenses'
const MONTH_KEY_PATTERN = /^\d{4}-\d{2}$/

function isValidExpense(expense) {
  return (
    expense &&
    typeof expense.id === 'number' &&
    typeof expense.title === 'string' &&
    typeof expense.amount === 'number' &&
    expense.amount > 0 &&
    typeof expense.monthKey === 'string' &&
    MONTH_KEY_PATTERN.test(expense.monthKey)
  )
}

function migrateExpense(expense) {
  if (
    expense &&
    typeof expense.id === 'number' &&
    typeof expense.title === 'string' &&
    typeof expense.amount === 'number' &&
    expense.amount > 0
  ) {
    if (typeof expense.monthKey === 'string' && MONTH_KEY_PATTERN.test(expense.monthKey)) {
      return expense
    }
    return { ...expense, monthKey: getCurrentMonthKey() }
  }
  return null
}

export function loadExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialExpenses

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return initialExpenses

    const migrated = parsed.map(migrateExpense).filter(Boolean)
    if (!migrated.every(isValidExpense)) return initialExpenses

    return migrated
  } catch {
    return initialExpenses
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

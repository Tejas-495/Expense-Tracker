import { initialExpenses } from '../data/initialExpenses'
import { detectExpenseCategory, isValidCategory, normalizeCategory } from './category'
import { getCurrentMonthKey } from './month'

const STORAGE_KEY = 'expense-tracker-expenses'
const MONTH_KEY_PATTERN = /^\d{4}-\d{2}$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

function getCreatedAtFromLegacyId(id) {
  if (typeof id === 'number' && Number.isFinite(id) && id > 1_000_000_000_000) {
    const date = new Date(id)
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().split('T')[0]
    }
  }

  return getTodayDate()
}

function isValidExpense(expense) {
  return (
    expense &&
    typeof expense.id === 'number' &&
    typeof expense.title === 'string' &&
    typeof expense.amount === 'number' &&
    expense.amount > 0 &&
    typeof expense.category === 'string' &&
    isValidCategory(expense.category) &&
    typeof expense.createdAt === 'string' &&
    DATE_PATTERN.test(expense.createdAt) &&
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
    const monthKey =
      typeof expense.monthKey === 'string' && MONTH_KEY_PATTERN.test(expense.monthKey)
        ? expense.monthKey
        : getCurrentMonthKey()

    const category =
      typeof expense.category === 'string' && isValidCategory(expense.category)
        ? normalizeCategory(expense.category)
        : normalizeCategory(detectExpenseCategory(expense.title))

    const createdAt =
      typeof expense.createdAt === 'string' && DATE_PATTERN.test(expense.createdAt)
        ? expense.createdAt
        : getCreatedAtFromLegacyId(expense.id)

    return { ...expense, monthKey, category, createdAt }
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

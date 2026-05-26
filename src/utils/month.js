/** Month bucket as "YYYY-MM" (e.g. "2026-05") */
export function getCurrentMonthKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

export function filterExpensesByMonth(expenses, monthKey) {
  return expenses.filter((expense) => expense.monthKey === monthKey)
}

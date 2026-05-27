import { getCurrentMonthKey } from '../utils/month'

// Sample expenses for the current month (amounts in INR)
const monthKey = getCurrentMonthKey()
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()

function getCurrentMonthDate(day) {
  return new Date(year, month, day).toISOString().split('T')[0]
}

export const initialExpenses = [
  { id: 1, title: 'College textbooks', amount: 3500, category: 'College', monthKey, createdAt: getCurrentMonthDate(3) },
  { id: 2, title: 'Cafeteria lunch', amount: 120, category: 'Food', monthKey, createdAt: getCurrentMonthDate(9) },
  { id: 3, title: 'Bus pass (monthly)', amount: 1500, category: 'Travel', monthKey, createdAt: getCurrentMonthDate(14) },
  { id: 4, title: 'Notebook & pens', amount: 250, category: 'College', monthKey, createdAt: getCurrentMonthDate(20) },
]

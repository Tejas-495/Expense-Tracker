import { getCurrentMonthKey } from '../utils/month'

// Sample expenses for the current month (amounts in INR)
const monthKey = getCurrentMonthKey()

export const initialExpenses = [
  { id: 1, title: 'College textbooks', amount: 3500, category: 'College', monthKey },
  { id: 2, title: 'Cafeteria lunch', amount: 120, category: 'Food', monthKey },
  { id: 3, title: 'Bus pass (monthly)', amount: 1500, category: 'Travel', monthKey },
  { id: 4, title: 'Notebook & pens', amount: 250, category: 'College', monthKey },
]

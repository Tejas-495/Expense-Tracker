export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Recharge',
  'Shopping',
  'College',
  'Subscriptions',
  'Entertainment',
]

const CATEGORY_KEYWORDS = {
  Food: [
    'food',
    'lunch',
    'dinner',
    'breakfast',
    'snack',
    'cafe',
    'coffee',
    'tea',
    'restaurant',
    'cafeteria',
    'zomato',
    'swiggy',
  ],
  Travel: [
    'travel',
    'trip',
    'bus',
    'train',
    'metro',
    'taxi',
    'cab',
    'auto',
    'uber',
    'ola',
    'fuel',
    'petrol',
  ],
  Recharge: ['recharge', 'mobile', 'data', 'topup', 'top-up', 'internet'],
  Shopping: ['shopping', 'buy', 'purchase', 'clothes', 'shoes', 'grocery', 'mart'],
  College: [
    'college',
    'book',
    'books',
    'notebook',
    'stationery',
    'exam',
    'fee',
    'tuition',
    'course',
  ],
  Subscriptions: [
    'subscription',
    'netflix',
    'spotify',
    'youtube premium',
    'prime',
    'membership',
    'plan',
  ],
  Entertainment: ['movie', 'cinema', 'game', 'concert', 'party', 'entertainment'],
}

export function detectExpenseCategory(title) {
  const normalizedTitle = title.trim().toLowerCase()

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => normalizedTitle.includes(keyword))) {
      return category
    }
  }

  return 'Shopping'
}

export function isValidCategory(category) {
  return EXPENSE_CATEGORIES.includes(category)
}

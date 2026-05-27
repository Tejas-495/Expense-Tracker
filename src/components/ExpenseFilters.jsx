function ExpenseFilters({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onSelectedCategoryChange,
  selectedDate,
  onSelectedDateChange,
  minAmount,
  onMinAmountChange,
  maxAmount,
  onMaxAmountChange,
  categories,
}) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-700/80 bg-slate-800/60 p-5 shadow-lg shadow-black/20 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Search & filters</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Search title..."
          className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />

        <select
          value={selectedCategory}
          onChange={(e) => onSelectedCategoryChange(e.target.value)}
          className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onSelectedDateChange(e.target.value)}
          className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            step="0.01"
            value={minAmount}
            onChange={(e) => onMinAmountChange(e.target.value)}
            placeholder="Min ₹"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={maxAmount}
            onChange={(e) => onMaxAmountChange(e.target.value)}
            placeholder="Max ₹"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
      </div>
    </section>
  )
}

export default ExpenseFilters

'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useExpenses } from '@/context/ExpenseContext';
import { EXPENSE_CATEGORIES } from '@/types/expense';

export default function ExpenseFilters() {
  const { filters, setFilters, clearFilters, filteredExpenses, expenses } = useExpenses();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.startDate !== null ||
    filters.endDate !== null ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      {/* Search bar - always visible */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search expenses..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center space-x-2 px-4 py-2.5 border rounded-lg font-medium transition-colors ${
            hasActiveFilters
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* Category filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({ category: 'All' })}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filters.category === 'All'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {EXPENSE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters({ category: cat })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date range filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <DatePicker
                selected={filters.startDate}
                onChange={(date: Date | null) => setFilters({ startDate: date })}
                selectsStart
                startDate={filters.startDate}
                endDate={filters.endDate}
                placeholderText="Start date"
                maxDate={new Date()}
                isClearable
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <span className="text-gray-500 hidden sm:inline">to</span>
              <DatePicker
                selected={filters.endDate}
                onChange={(date: Date | null) => setFilters({ endDate: date })}
                selectsEnd
                startDate={filters.startDate}
                endDate={filters.endDate}
                minDate={filters.startDate ?? undefined}
                placeholderText="End date"
                maxDate={new Date()}
                isClearable
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-500">
                Showing {filteredExpenses.length} of {expenses.length} expenses
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

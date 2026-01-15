'use client';

import Link from 'next/link';
import ExpenseForm from '@/components/ExpenseForm';
import { useExpenses } from '@/context/ExpenseContext';

export default function AddExpensePage() {
  const { addExpense } = useExpenses();

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add Expense</h1>
        <p className="text-gray-500 mt-1">Record a new expense to track your spending</p>
      </div>

      {/* Expense Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <ExpenseForm onSubmit={addExpense} />
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Quick Tips</h4>
            <ul className="mt-1 text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Be specific with descriptions for better tracking</li>
              <li>Choose the right category to see accurate spending reports</li>
              <li>Add expenses as they happen for accurate records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

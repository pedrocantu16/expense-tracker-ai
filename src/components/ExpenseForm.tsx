'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Expense, ExpenseCategory, EXPENSE_CATEGORIES, CATEGORY_ICONS } from '@/types/expense';
import { validateExpenseForm } from '@/lib/utils';

interface ExpenseFormProps {
  onSubmit: (data: { amount: number; description: string; category: ExpenseCategory; date: Date }) => void;
  initialData?: Expense;
  onCancel?: () => void;
  submitLabel?: string;
}

// Helper function to get initial values
function getInitialValues(initialData?: Expense) {
  if (initialData) {
    return {
      amount: initialData.amount.toString(),
      description: initialData.description,
      category: initialData.category,
      date: new Date(initialData.date),
    };
  }
  return {
    amount: '',
    description: '',
    category: 'Food' as ExpenseCategory,
    date: new Date(),
  };
}

export default function ExpenseForm({ onSubmit, initialData, onCancel, submitLabel = 'Add Expense' }: ExpenseFormProps) {
  // Initialize state directly from props
  const initialValues = getInitialValues(initialData);

  const [amount, setAmount] = useState(initialValues.amount);
  const [description, setDescription] = useState(initialValues.description);
  const [category, setCategory] = useState<ExpenseCategory>(initialValues.category);
  const [date, setDate] = useState<Date | null>(initialValues.date);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateExpenseForm({ amount, description, category, date });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    onSubmit({
      amount: parseFloat(amount),
      description,
      category,
      date: date!,
    });

    setIsSubmitting(false);

    if (!initialData) {
      // Reset form for new expenses
      setAmount('');
      setDescription('');
      setCategory('Food');
      setDate(new Date());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Expense added successfully!
        </div>
      )}

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
              errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you spend on?"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EXPENSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                category === cat
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <DatePicker
          selected={date}
          onChange={(date: Date | null) => setDate(date)}
          dateFormat="MMMM d, yyyy"
          maxDate={new Date()}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
            errors.date ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          wrapperClassName="w-full"
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-all ${
            isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-emerald-700 active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}

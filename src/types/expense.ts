export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string; // ISO date string
  createdAt: string; // ISO datetime string
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: ExpenseCategory;
  date: Date;
}

export interface ExpenseFilters {
  category: ExpenseCategory | 'All';
  startDate: Date | null;
  endDate: Date | null;
  searchQuery: string;
}

export interface ExpenseSummary {
  totalSpending: number;
  monthlySpending: number;
  averageExpense: number;
  expenseCount: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  monthlyTrend: { month: string; amount: number }[];
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#10B981',
  Transportation: '#3B82F6',
  Entertainment: '#8B5CF6',
  Shopping: '#F59E0B',
  Bills: '#EF4444',
  Other: '#6B7280',
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛒',
  Bills: '📄',
  Other: '📦',
};

import { Expense, ExpenseCategory, ExpenseSummary, ExpenseFilters } from '@/types/expense';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO, subMonths } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM dd, yyyy');
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MM/dd/yyyy');
}

export function filterExpenses(expenses: Expense[], filters: ExpenseFilters): Expense[] {
  return expenses.filter((expense) => {
    // Category filter
    if (filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }

    // Date range filter
    const expenseDate = parseISO(expense.date);
    if (filters.startDate && filters.endDate) {
      if (!isWithinInterval(expenseDate, { start: filters.startDate, end: filters.endDate })) {
        return false;
      }
    } else if (filters.startDate && expenseDate < filters.startDate) {
      return false;
    } else if (filters.endDate && expenseDate > filters.endDate) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesDescription = expense.description.toLowerCase().includes(query);
      const matchesCategory = expense.category.toLowerCase().includes(query);
      const matchesAmount = expense.amount.toString().includes(query);
      if (!matchesDescription && !matchesCategory && !matchesAmount) {
        return false;
      }
    }

    return true;
  });
}

export function calculateSummary(expenses: Expense[]): ExpenseSummary {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Total spending
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Monthly spending
  const monthlyExpenses = expenses.filter((exp) => {
    const date = parseISO(exp.date);
    return isWithinInterval(date, { start: monthStart, end: monthEnd });
  });
  const monthlySpending = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Average expense
  const averageExpense = expenses.length > 0 ? totalSpending / expenses.length : 0;

  // Category breakdown
  const categoryBreakdown: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };
  expenses.forEach((exp) => {
    categoryBreakdown[exp.category] += exp.amount;
  });

  // Monthly trend (last 6 months)
  const monthlyTrend: { month: string; amount: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const mStart = startOfMonth(monthDate);
    const mEnd = endOfMonth(monthDate);
    const monthExpenses = expenses.filter((exp) => {
      const date = parseISO(exp.date);
      return isWithinInterval(date, { start: mStart, end: mEnd });
    });
    const amount = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    monthlyTrend.push({
      month: format(monthDate, 'MMM'),
      amount,
    });
  }

  return {
    totalSpending,
    monthlySpending,
    averageExpense,
    expenseCount: expenses.length,
    categoryBreakdown,
    monthlyTrend,
  };
}

export function exportToCSV(expenses: Expense[]): string {
  const headers = ['Date', 'Description', 'Category', 'Amount'];
  const rows = expenses.map((exp) => [
    formatDateShort(exp.date),
    `"${exp.description.replace(/"/g, '""')}"`,
    exp.category,
    exp.amount.toFixed(2),
  ]);

  const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  return csv;
}

export function downloadCSV(expenses: Expense[], filename: string = 'expenses.csv'): void {
  const csv = exportToCSV(expenses);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function validateExpenseForm(data: {
  amount: string;
  description: string;
  category: string;
  date: Date | null;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Amount validation
  const amount = parseFloat(data.amount);
  if (!data.amount || isNaN(amount)) {
    errors.amount = 'Please enter a valid amount';
  } else if (amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (amount > 1000000) {
    errors.amount = 'Amount seems too large';
  }

  // Description validation
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Please enter a description';
  } else if (data.description.length > 200) {
    errors.description = 'Description is too long (max 200 characters)';
  }

  // Category validation
  if (!data.category) {
    errors.category = 'Please select a category';
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Please select a date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

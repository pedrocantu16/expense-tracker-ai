import { Expense } from '@/types/expense';

const STORAGE_KEY = 'expense-tracker-expenses';

export function getExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Expense[];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function addExpense(expense: Expense): Expense[] {
  const expenses = getExpenses();
  const updated = [expense, ...expenses];
  saveExpenses(updated);
  return updated;
}

export function updateExpense(id: string, updates: Partial<Expense>): Expense[] {
  const expenses = getExpenses();
  const updated = expenses.map((expense) =>
    expense.id === id ? { ...expense, ...updates } : expense
  );
  saveExpenses(updated);
  return updated;
}

export function deleteExpense(id: string): Expense[] {
  const expenses = getExpenses();
  const updated = expenses.filter((expense) => expense.id !== id);
  saveExpenses(updated);
  return updated;
}

export function clearAllExpenses(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

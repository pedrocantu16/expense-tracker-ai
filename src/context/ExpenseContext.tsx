'use client';

import React, { createContext, useContext, useState, useCallback, useSyncExternalStore } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpenseCategory, ExpenseFilters, ExpenseSummary } from '@/types/expense';
import { getExpenses, saveExpenses, deleteExpense as removeExpense } from '@/lib/storage';
import { filterExpenses, calculateSummary } from '@/lib/utils';

interface ExpenseContextType {
  expenses: Expense[];
  filteredExpenses: Expense[];
  filters: ExpenseFilters;
  summary: ExpenseSummary;
  isLoading: boolean;
  addExpense: (data: { amount: number; description: string; category: ExpenseCategory; date: Date }) => void;
  updateExpense: (id: string, data: { amount: number; description: string; category: ExpenseCategory; date: Date }) => void;
  deleteExpense: (id: string) => void;
  setFilters: (filters: Partial<ExpenseFilters>) => void;
  clearFilters: () => void;
}

const defaultFilters: ExpenseFilters = {
  category: 'All',
  startDate: null,
  endDate: null,
  searchQuery: '',
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Custom hook for hydration-safe localStorage access
function useHydratedExpenses() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return JSON.stringify(getExpenses());
  }, []);

  const getServerSnapshot = useCallback(() => {
    return '[]';
  }, []);

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return JSON.parse(snapshot) as Expense[];
}

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const hydratedExpenses = useHydratedExpenses();
  const [expenses, setExpenses] = useState<Expense[]>(hydratedExpenses);
  const [filters, setFiltersState] = useState<ExpenseFilters>(defaultFilters);

  // Calculate filtered expenses
  const filteredExpenses = filterExpenses(expenses, filters);

  // Calculate summary based on all expenses
  const summary = calculateSummary(expenses);

  const addExpense = useCallback(
    (data: { amount: number; description: string; category: ExpenseCategory; date: Date }) => {
      const newExpense: Expense = {
        id: uuidv4(),
        amount: data.amount,
        description: data.description.trim(),
        category: data.category,
        date: data.date.toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      const updated = [newExpense, ...expenses];
      setExpenses(updated);
      saveExpenses(updated);
    },
    [expenses]
  );

  const updateExpense = useCallback(
    (id: string, data: { amount: number; description: string; category: ExpenseCategory; date: Date }) => {
      const updated = expenses.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              amount: data.amount,
              description: data.description.trim(),
              category: data.category,
              date: data.date.toISOString().split('T')[0],
            }
          : expense
      );
      setExpenses(updated);
      saveExpenses(updated);
    },
    [expenses]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      const updated = removeExpense(id);
      setExpenses(updated);
    },
    []
  );

  const setFilters = useCallback((newFilters: Partial<ExpenseFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        filters,
        summary,
        isLoading: false,
        addExpense,
        updateExpense,
        deleteExpense,
        setFilters,
        clearFilters,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}

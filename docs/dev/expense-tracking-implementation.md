# Expense Tracking - Technical Documentation

> **Feature Type:** Frontend (Client-Side Only)
> **Last Updated:** 2026-01-31
> **Related User Guide:** [../user/how-to-expense-tracking.md](../user/how-to-expense-tracking.md)

## Overview

The expense tracking feature is the core of this application. It allows users to create, read, update, and delete personal expenses, categorize them across six predefined categories, filter and search through them, view spending analytics via summary cards and charts, and export data as CSV. All data is persisted in browser localStorage with no backend dependency.

## Architecture

The application follows a unidirectional data flow pattern using React Context API for state management. Components read from and dispatch actions to a central `ExpenseContext`, which synchronizes state with browser localStorage via a dedicated storage layer. Utility functions handle filtering, summary calculations, validation, and data export.

```
User Interaction
    |
React Page Components (/app)
    |
UI Components (/components)
    |
ExpenseContext (/context) -- state management & business logic
    |
Storage Utilities (/lib/storage.ts) -- localStorage persistence
    |
Browser localStorage
```

### Key Files

| File | Purpose |
|------|---------|
| `src/types/expense.ts` | Core TypeScript types, category constants, and color/icon mappings |
| `src/context/ExpenseContext.tsx` | React Context provider with all CRUD operations, filtering, and summary state |
| `src/lib/storage.ts` | localStorage read/write abstraction layer |
| `src/lib/utils.ts` | Formatting, filtering, summary calculations, validation, CSV export |
| `src/app/page.tsx` | Dashboard page (summary cards, charts, recent expenses) |
| `src/app/add/page.tsx` | Add expense page |
| `src/app/expenses/page.tsx` | Full expense list with filters |
| `src/components/ExpenseForm.tsx` | Reusable form for adding/editing expenses |
| `src/components/ExpenseList.tsx` | Expense list wrapper with CSV export |
| `src/components/ExpenseItem.tsx` | Individual expense card with edit/delete |
| `src/components/ExpenseFilters.tsx` | Filter panel (search, category, date range) |
| `src/components/SummaryCards.tsx` | Dashboard statistics cards |
| `src/components/SpendingCharts.tsx` | Bar chart (monthly trend), pie chart (category breakdown) |
| `src/components/Header.tsx` | Navigation header |
| `src/app/layout.tsx` | Root layout wrapping app in ExpenseProvider |
| `src/app/globals.css` | Global styles, datepicker overrides, animations |

### Data Flow

**Adding an expense:**
1. User fills out `ExpenseForm` on `/add` page
2. Client-side validation runs via `validateExpenseForm()`
3. On valid submission, `addExpense()` is called on `ExpenseContext`
4. Context generates a UUID, formats the date to ISO string, prepends the expense to the array
5. `saveExpenses()` writes the updated array to localStorage
6. React state updates, triggering re-renders across all consuming components

**Filtering expenses:**
1. User adjusts controls in `ExpenseFilters` (search, category, date range)
2. `setFilters()` updates filter state in context
3. `filterExpenses()` utility re-runs against the full expense list
4. `filteredExpenses` and recalculated `summary` propagate to all consumers

**Editing/Deleting:**
1. User clicks edit/delete on an `ExpenseItem`
2. Edit: inline `ExpenseForm` renders with `initialData`; on submit, `updateExpense(id, data)` merges changes
3. Delete: confirmation dialog shown; on confirm, `deleteExpense(id)` removes from array
4. Both persist to localStorage and update context state

## API Reference

This is a frontend-only application with no REST API. The public interface is the React Context.

### ExpenseContext Interface

```typescript
interface ExpenseContextType {
  expenses: Expense[]
  filteredExpenses: Expense[]
  filters: ExpenseFilters
  summary: ExpenseSummary
  isLoading: boolean
  addExpense: (data: ExpenseFormData) => void
  updateExpense: (id: string, data: ExpenseFormData) => void
  deleteExpense: (id: string) => void
  setFilters: (filters: Partial<ExpenseFilters>) => void
  clearFilters: () => void
}
```

### useExpenses Hook

- **Import:** `import { useExpenses } from '@/context/ExpenseContext'`
- **Returns:** `ExpenseContextType`
- **Throws:** Error if used outside `ExpenseProvider`

### Storage Functions (`src/lib/storage.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `getExpenses` | `() => Expense[]` | Reads all expenses from localStorage |
| `saveExpenses` | `(expenses: Expense[]) => void` | Writes full expense array to localStorage |
| `addExpense` | `(expense: Omit<Expense, 'id' | 'createdAt'>) => Expense[]` | Adds one expense, returns updated array |
| `updateExpense` | `(id: string, updates: Partial<Expense>) => Expense[]` | Updates expense by ID |
| `deleteExpense` | `(id: string) => Expense[]` | Removes expense by ID |
| `clearAllExpenses` | `() => void` | Deletes all expense data |

**Storage key:** `'expense-tracker-expenses'`

### Utility Functions (`src/lib/utils.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `formatCurrency` | `(amount: number) => string` | Formats as USD (e.g., `$1,234.56`) |
| `formatDate` | `(date: string) => string` | Formats as `MMM dd, yyyy` |
| `formatDateShort` | `(date: string) => string` | Formats as `MM/dd/yyyy` |
| `filterExpenses` | `(expenses: Expense[], filters: ExpenseFilters) => Expense[]` | Applies all active filters |
| `calculateSummary` | `(expenses: Expense[]) => ExpenseSummary` | Computes all statistics including monthly trend |
| `validateExpenseForm` | `(data: ExpenseFormData) => { isValid: boolean; errors: Record<string, string> }` | Validates form input |
| `exportToCSV` | `(expenses: Expense[]) => string` | Converts expenses to CSV string |
| `downloadCSV` | `(expenses: Expense[], filename?: string) => void` | Triggers browser CSV download |

### Core Types (`src/types/expense.ts`)

```typescript
type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other'

interface Expense {
  id: string              // UUID v4
  amount: number
  description: string
  category: ExpenseCategory
  date: string           // ISO date (YYYY-MM-DD)
  createdAt: string      // ISO datetime
}

interface ExpenseFormData {
  amount: string         // String from form input
  description: string
  category: ExpenseCategory
  date: Date
}

interface ExpenseFilters {
  category: ExpenseCategory | 'All'
  startDate: Date | null
  endDate: Date | null
  searchQuery: string
}

interface ExpenseSummary {
  totalSpending: number
  monthlySpending: number
  averageExpense: number
  expenseCount: number
  categoryBreakdown: Record<ExpenseCategory, number>
  monthlyTrend: { month: string; amount: number }[]
}
```

### Constants

- `EXPENSE_CATEGORIES`: `['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other']`
- `CATEGORY_COLORS`: Hex color map per category
- `CATEGORY_ICONS`: Emoji map per category

## Implementation Details

**SSR Hydration Safety:** The context uses `useSyncExternalStore` with a custom `useHydratedExpenses()` hook to safely read from localStorage without hydration mismatches. During server rendering, an empty array is returned; the client subscribes to localStorage after mount.

**Filtering Logic:** `filterExpenses()` applies filters in sequence: category match (if not 'All'), date range inclusion (if dates set), and search query matching against description, category name, and amount string. All comparisons are case-insensitive.

**Summary Calculations:** `calculateSummary()` computes total spending, current-month spending (using `date-fns` `startOfMonth`/`endOfMonth`), average per expense, category totals, and a 6-month trend by iterating backwards from the current month.

**Form Validation Rules:**
- Amount: must parse as a number, must be > 0 and < 1,000,000
- Description: required, max 200 characters
- Category: required (must be a valid `ExpenseCategory`)
- Date: required

**CSV Export:** Generates a CSV with columns `Date, Description, Category, Amount` and triggers a browser download via a dynamically created `<a>` element with a Blob URL.

## Dependencies

### External Packages

| Package | Version | Usage |
|---------|---------|-------|
| `next` | 16.1.2 | Application framework (App Router) |
| `react` / `react-dom` | 19.2.3 | UI rendering |
| `date-fns` | 4.1.0 | Date formatting and manipulation |
| `react-datepicker` | 9.1.0 | Date picker component in forms and filters |
| `recharts` | 3.6.0 | Bar chart and pie chart visualizations |
| `uuid` | 13.0.0 | Generating unique expense IDs |
| `tailwindcss` | 4 | Utility-first CSS framework |

### Internal Module Dependencies

- All components depend on `ExpenseContext` via the `useExpenses` hook
- `ExpenseContext` depends on `storage.ts` and `utils.ts`
- `utils.ts` depends on `date-fns` and `types/expense.ts`
- `storage.ts` depends on `types/expense.ts`
- `ExpenseForm` depends on `react-datepicker`
- `SpendingCharts` depends on `recharts`
- `ExpenseItem` composes `ExpenseForm` for inline editing

## Error Handling

**Storage layer:** All localStorage operations are wrapped in try/catch blocks. On read errors, an empty array is returned and the error is logged to `console.error`. On write errors, the error is logged but no user notification is shown.

**Form validation:** `validateExpenseForm()` returns a structured error object. `ExpenseForm` displays field-level error messages in red text below each input. Submission is blocked while `isValid` is false.

**Component states:**
- Loading: Pulse-animated skeleton placeholders are shown while `isLoading` is true (during initial hydration)
- Empty state: Friendly messages with calls-to-action link to the `/add` page
- Delete confirmation: A dialog prevents accidental deletions

**Date constraints:** The date picker enforces `maxDate={new Date()}` to prevent future-dated expenses.

## Testing

There are currently no tests in the project. No test framework (Jest, Vitest, etc.) is configured, and no test files exist.

**Recommended test targets if tests are added:**
- Unit tests for `validateExpenseForm()`, `filterExpenses()`, `calculateSummary()`, `exportToCSV()` in `src/lib/utils.ts`
- Unit tests for storage functions in `src/lib/storage.ts` (with localStorage mocking)
- Component tests for `ExpenseForm` (validation, submission)
- Integration tests for `ExpenseContext` (CRUD operations, filter state)

## Related Documentation

- User Guide: [How to Track Expenses](../user/how-to-expense-tracking.md)

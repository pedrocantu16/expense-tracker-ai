# CLAUDE.md - AI Assistant Guidelines

## Project Overview

Client-side expense tracker built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Data persists in browser localStorage only - no backend.

**Key files:**
- `src/types/expense.ts` - Types and constants
- `src/context/ExpenseContext.tsx` - State management
- `src/lib/storage.ts` - localStorage operations
- `src/lib/utils.ts` - Utilities (formatting, validation, filtering)

## Before Making Any Changes (MANDATORY)

### 1. Read Core Files First
```
src/types/expense.ts           # All types and constants
src/context/ExpenseContext.tsx # State management
src/lib/storage.ts             # Storage layer
src/lib/utils.ts               # Utility functions
```

### 2. Read Task-Specific Files
| Task | Files |
|------|-------|
| Dashboard | `src/app/page.tsx`, `src/components/SummaryCards.tsx`, `src/components/SpendingCharts.tsx` |
| Expense form | `src/components/ExpenseForm.tsx`, `src/app/add/page.tsx` |
| Expense list | `src/components/ExpenseList.tsx`, `src/components/ExpenseItem.tsx`, `src/components/ExpenseFilters.tsx` |
| Navigation | `src/components/Header.tsx`, `src/app/layout.tsx` |

### 3. Understand Existing Patterns
- Check similar components for patterns
- Follow existing color scheme (emerald for primary)
- Match error handling and loading state patterns

### 4. Check for Existing Tests
Look for `*.test.ts(x)` files related to your changes.

## Git Workflow

**ALWAYS work on branches. NEVER commit directly to main.**

### Branch Names
```
feature/  - New features
fix/      - Bug fixes
refactor/ - Refactoring
test/     - Test additions
```

### Workflow
```bash
git checkout main && git pull origin main
git checkout -b feature/your-feature-name
# Make changes, commit with clear messages
git push -u origin feature/your-feature-name
```

### Commit Format
```
<type>: <summary>

<details if needed>
```
Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

## Testing Requirements

**Every change MUST include tests.**

### Setup (if not configured)
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`:
```json
{ "scripts": { "test": "vitest", "test:coverage": "vitest --coverage" } }
```

### Test Location
Place tests next to source files: `utils.ts` → `utils.test.ts`

### What to Test
| Type | Verify |
|------|--------|
| Utility functions | Outputs, edge cases, errors |
| Components | Rendering, interactions, state |
| Forms | Validation, submission, callbacks |

### Example Test
```typescript
import { describe, it, expect } from 'vitest'
import { formatCurrency } from './utils'

describe('formatCurrency', () => {
  it('formats as USD', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })
})
```

## Code Conventions

### TypeScript
- Avoid `any` - use strict types
- Define types in `src/types/expense.ts`

### React
- Use `'use client'` directive for all components
- Access state via `useExpenses()` hook
- Handle `isLoading` state for localStorage data

### Styling
- Tailwind CSS only (no inline styles)
- Colors: `emerald-600` (primary), `gray-*` (text/borders)
- Responsive: use `sm:`, `md:`, `lg:` prefixes

### Imports
```typescript
import { Expense } from '@/types/expense'  // Use path aliases
```

## Data Flow

```
Component → ExpenseContext → storage.ts → localStorage
```

**Expense structure:**
```typescript
{ id, amount, description, category, date, createdAt }
```

Categories: `Food | Transportation | Entertainment | Shopping | Bills | Other`

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Lint code
npm test         # Run tests
```

## Checklists

### New Feature
- [ ] Create branch from main
- [ ] Read relevant code first
- [ ] Follow existing patterns
- [ ] Add TypeScript types
- [ ] Write tests
- [ ] Handle loading/empty/error states
- [ ] Run lint and tests
- [ ] Test in browser

### Bug Fix
- [ ] Create branch from main
- [ ] Read code where bug occurs
- [ ] Write failing test first
- [ ] Fix bug
- [ ] Verify test passes
- [ ] Run full test suite

## Pitfalls to Avoid

1. **Hydration mismatches** - Always check `isLoading` before rendering localStorage data
2. **Direct localStorage** - Use `src/lib/storage.ts` functions
3. **Mutating state** - Use context methods (`addExpense`, etc.)
4. **Missing 'use client'** - Required for hooks/browser APIs
5. **Hardcoded categories** - Use `EXPENSE_CATEGORIES` constant
6. **Skipping tests** - Every change needs test coverage

## References

- Technical docs: `docs/dev/expense-tracking-implementation.md`
- User guide: `docs/user/how-to-expense-tracking.md`

# Add Feature Workflow

Automate the complete feature development workflow for the expense tracker.

## Instructions

You are adding a new feature to the expense tracker app. Follow this workflow strictly.

### Step 1: Create Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/$ARGUMENTS
```

If `$ARGUMENTS` is empty, ask the user for the feature name.

### Step 2: Read Core Context

Before writing any code, read these files to understand the architecture:

1. `src/types/expense.ts` - Types and constants
2. `src/context/ExpenseContext.tsx` - State management
3. `src/lib/storage.ts` - Storage layer
4. `src/lib/utils.ts` - Utilities

### Step 3: Identify Affected Files

Based on the feature, identify and read files that will be modified:

- Dashboard features → `src/app/page.tsx`, `src/components/SummaryCards.tsx`, `src/components/SpendingCharts.tsx`
- Form features → `src/components/ExpenseForm.tsx`
- List features → `src/components/ExpenseList.tsx`, `src/components/ExpenseItem.tsx`, `src/components/ExpenseFilters.tsx`
- New pages → `src/app/layout.tsx` for patterns

### Step 4: Plan Implementation

Before coding, outline:
1. What types need to be added/modified
2. What components need changes
3. What utilities are needed
4. What tests will be written

Present this plan to the user for approval.

### Step 5: Implement

Follow these conventions:
- Add `'use client'` to components
- Use `@/` path aliases
- Use Tailwind CSS (emerald-600 for primary actions)
- Handle `isLoading` states
- Use existing patterns from similar components

### Step 6: Write Tests

Create tests in files adjacent to source:
- `ComponentName.test.tsx` for components
- `utils.test.ts` for utilities

Test: rendering, user interactions, edge cases.

### Step 7: Verify

```bash
npm run lint
npm test
npm run build
```

### Step 8: Commit

```bash
git add <specific-files>
git commit -m "feat: <description>"
```

Report completion status to user.

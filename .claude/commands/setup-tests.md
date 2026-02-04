# Setup Testing Infrastructure

Set up Vitest testing framework and create initial tests for the expense tracker.

## Instructions

### Step 1: Install Dependencies

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Step 2: Create Vitest Config

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Step 3: Create Test Setup

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
```

### Step 4: Update package.json

Add test scripts to package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

### Step 5: Create Initial Tests

Read `src/lib/utils.ts` and create `src/lib/utils.test.ts` with tests for:
- `formatCurrency`
- `formatDate`
- `validateExpenseForm`
- `filterExpenses`
- `calculateSummary`

Read `src/lib/storage.ts` and create `src/lib/storage.test.ts` with tests for:
- `getExpenses`
- `saveExpenses`
- `addExpense`
- `updateExpense`
- `deleteExpense`

### Step 6: Run Tests

```bash
npm test
```

Report results and any failures to user.

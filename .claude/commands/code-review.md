# Code Review

Review staged or uncommitted changes before committing.

## Instructions

### Step 1: Get Changes

Run `git diff --staged` and `git diff` to see all changes. If no changes, inform user.

### Step 2: Review Each File

For each changed file, check:

**TypeScript/React:**
- [ ] No `any` types - use proper typing
- [ ] `'use client'` directive present if using hooks/browser APIs
- [ ] Uses `@/` path aliases, not relative paths
- [ ] Handles `isLoading` state for localStorage data
- [ ] No direct localStorage calls (use `src/lib/storage.ts`)
- [ ] Uses context methods, not direct state mutation

**Styling:**
- [ ] Uses Tailwind CSS only (no inline styles)
- [ ] Follows color scheme (emerald-600 primary, gray-* secondary)
- [ ] Responsive classes where needed (sm:, md:, lg:)

**Logic:**
- [ ] No hardcoded categories (use EXPENSE_CATEGORIES)
- [ ] Dates handled with date-fns, stored as ISO strings
- [ ] Error cases handled appropriately
- [ ] Edge cases considered (empty data, invalid input)

**Tests:**
- [ ] New functions have unit tests
- [ ] New components have component tests
- [ ] Tests cover success and failure cases

### Step 3: Report Findings

Provide a summary:

```
## Review Summary

**Files reviewed:** [list]

### Issues Found
- [file:line] Issue description

### Suggestions
- [file:line] Suggestion

### Missing Tests
- [function/component] needs tests

### Verdict
[APPROVED / NEEDS CHANGES]
```

### Step 4: If Issues Found

Offer to fix issues automatically or provide specific guidance.

### Step 5: If Approved

Suggest commit message based on changes:

```bash
git commit -m "<type>: <description>"
```

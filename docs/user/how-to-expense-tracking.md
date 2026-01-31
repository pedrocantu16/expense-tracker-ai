# How to Track Expenses

> **Related Technical Docs:** [../dev/expense-tracking-implementation.md](../dev/expense-tracking-implementation.md)

## What This Feature Does

The expense tracking feature lets you record, categorize, and analyze your personal spending. You can add expenses with amounts and categories, filter and search through your history, view spending trends with charts, and export your data as a CSV file.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- The application running locally (`npm run dev`) or deployed to a hosting provider
- No account or login required -- data is stored in your browser

### Important Note on Data Storage

All your expense data is stored in your browser's local storage. This means:
- Your data stays on your device and is never sent to a server
- Clearing your browser data will erase your expenses
- Data does not sync between devices or browsers

## Step-by-Step Guide

### Step 1: View the Dashboard

When you open the application, you land on the **Dashboard** at `/`. This shows:
- **Summary cards** with your total spending, this month's spending, average expense, and top category
- **Spending charts** including a monthly trend bar chart and a category breakdown pie chart
- **Recent expenses** showing your latest entries

![Dashboard overview](../assets/screenshots/expense-tracking-dashboard.png)
<!-- TODO: Capture screenshot showing the dashboard with summary cards, charts, and recent expenses -->

### Step 2: Add a New Expense

1. Click **"Add Expense"** in the navigation header (or navigate to `/add`)
2. Fill in the form:
   - **Amount**: Enter the expense amount in dollars (e.g., `42.50`)
   - **Description**: Briefly describe the expense (e.g., "Lunch at cafe")
   - **Category**: Select one of the six categories by clicking its button: Food, Transportation, Entertainment, Shopping, Bills, or Other
   - **Date**: Pick the date the expense occurred (defaults to today; future dates are not allowed)
3. Click **"Add Expense"** to save

A green success notification appears briefly to confirm the expense was added.

![Add expense form](../assets/screenshots/expense-tracking-add.png)
<!-- TODO: Capture screenshot showing the add expense form filled out with a sample expense -->

### Step 3: View All Expenses

1. Click **"Expenses"** in the navigation header (or navigate to `/expenses`)
2. Your expenses are listed as cards showing the amount, description, category, and date
3. The total count of expenses is displayed at the top

![Expense list](../assets/screenshots/expense-tracking-list.png)
<!-- TODO: Capture screenshot showing the expense list with several entries -->

### Step 4: Filter and Search Expenses

1. On the Expenses page, click the **filter toggle** to expand the filter panel
2. Use any combination of filters:
   - **Search**: Type to search by description, category name, or amount
   - **Category**: Click a category button to show only that category (click again or select "All" to clear)
   - **Date Range**: Set a start and/or end date to narrow by time period
3. The list updates in real time as you adjust filters
4. An active filter count badge shows how many filters are applied
5. Click **"Clear Filters"** to reset all filters at once

![Filters panel](../assets/screenshots/expense-tracking-filters.png)
<!-- TODO: Capture screenshot showing the filter panel expanded with active filters -->

### Step 5: Edit an Expense

1. On the Expenses page, find the expense you want to change
2. Click the **edit icon** on the expense card
3. The card expands into an inline edit form pre-filled with the current values
4. Make your changes and click **"Update Expense"**
5. Click **"Cancel"** to discard changes

![Edit expense](../assets/screenshots/expense-tracking-edit.png)
<!-- TODO: Capture screenshot showing an expense in inline edit mode -->

### Step 6: Delete an Expense

1. On the Expenses page, find the expense you want to remove
2. Click the **delete icon** on the expense card
3. A confirmation dialog appears asking you to confirm
4. Click **"Delete"** to permanently remove the expense, or **"Cancel"** to keep it

![Delete confirmation](../assets/screenshots/expense-tracking-delete.png)
<!-- TODO: Capture screenshot showing the delete confirmation dialog -->

### Step 7: Export Your Data

1. On the Expenses page, click the **"Export CSV"** button at the top of the list
2. A CSV file downloads to your computer containing all currently filtered expenses
3. The file includes columns: Date, Description, Category, and Amount
4. Open the CSV in any spreadsheet application (Excel, Google Sheets, etc.)

## Common Tasks

- **Check this month's spending**: Look at the "This Month" summary card on the Dashboard
- **Find your biggest spending category**: The "Top Category" summary card and the pie chart on the Dashboard show this
- **See spending trends**: The bar chart on the Dashboard shows your last 6 months of spending
- **Find a specific expense**: Use the search box on the Expenses page to search by description or amount
- **View expenses for a specific period**: Use the date range filter on the Expenses page

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Expenses disappeared after clearing browser data | Unfortunately, data stored in local storage is deleted when you clear browser data. There is no way to recover it. |
| Expenses don't appear on another device | Data is stored locally in your browser and does not sync between devices. |
| Cannot select a future date | This is by design -- expenses can only be recorded for today or past dates. |
| Form won't submit | Check for red error messages below the form fields. Amount must be a positive number under $1,000,000, description is required (max 200 characters), and a category must be selected. |
| Charts show no data | Charts require at least one expense to display. Add an expense first. |
| CSV export is empty | The export only includes currently filtered expenses. Clear your filters to export all expenses. |

## FAQ

**Q: Is my data secure?**
A: Your data never leaves your browser. It is stored in localStorage on your device and is not transmitted to any server.

**Q: Is there a limit to how many expenses I can track?**
A: There is no hard limit in the application, but browser localStorage typically allows around 5-10 MB of data, which is enough for thousands of expenses.

**Q: Can I import expenses from a CSV or bank statement?**
A: This feature is not currently available. Expenses must be added manually through the form.

**Q: What currency is used?**
A: All amounts are displayed in US Dollars (USD).

**Q: Can I create custom categories?**
A: The six categories (Food, Transportation, Entertainment, Shopping, Bills, Other) are fixed. Use "Other" for expenses that don't fit the predefined categories.

## Related Guides

- Technical Documentation: [Expense Tracking Implementation](../dev/expense-tracking-implementation.md)

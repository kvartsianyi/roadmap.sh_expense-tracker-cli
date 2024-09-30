# Expense Tracker CLI

Expense Tracker is a simple CLI used to manage your finances.

**Requirements:** https://roadmap.sh/projects/expense-tracker

## Getting started
**1. Clone project**
```
git clone https://github.com/kvartsianyi/roadmap.sh_expense-tracker-cli.git
```

**2. Link package directly from the project folder**
```
cd ./expense-tracker-cli
npm link
```

## Commands

### Adding a New Expense
*To add a new expense, use the following command:*
```bash
expense-tracker add --description "<description>" --amount <amount>
```

**Example:**
```bash
expense-tracker add --description "Breakfast" --amount 15

// Output:
// ✅ Expense (ID: 1) added successfully!
```

### Updating Expenses
*To update an existing expenses, use:*
```bash
expense-tracker update --id <expense_id> --description "<description>" --amount <amount>
```

**Example:**
```bash
expense-tracker update --id 1 --description "Lunch" --amount 10

// Output:
// ✅ Expense (ID: 1) updated successfully!
```

### Deleting Expenses
*To delete a expense, use:*
```bash
expense-tracker delete --id <expense_id>
```

**Example:**
```bash
expense-tracker delete --id 1

// Output:
// ✅ Expense (ID: 4) deleted successfully!
```

### Listing All Expenses
*To list all expenses, use:*
```bash
expense-tracker list

// Output:
// ID | Description               | Amount     | Date
// ---|---------------------------|------------|-----------
// 1  | Lunch                     | $10        | 2024-09-30
```

### Getting summary of expenses
*To get summary of all expenses, use:*
```bash
expense-tracker summary

// Output:
// ✅ Total expenses: $10
```

*To get summary of expenses for specific moth, use `--month` option:*
```bash
expense-tracker summary --month <number_of_month>
```

**Example:**
```bash
expense-tracker summary --month 9

// Output:
// ✅ Total expenses for October: $10
```
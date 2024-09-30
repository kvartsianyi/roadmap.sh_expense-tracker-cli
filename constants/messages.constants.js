import CONFIG from '../config.js';
const { CURRENCY_SYMBOL } = CONFIG;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MESSAGES = {
	EXPENSE_DESCRIPTION_INVALID: '💀 Description must be at least 3 letters!',
	EXPENSE_AMOUNT_INVALID: '💀 Amount must be a positive number!',
	EXPENSE_ID_INVALID: '💀 Expense id must be an integer!',
	MONTH_INVALID: '💀 Invalid month. Please provide integer from 1 to 12!',
	EXPENSE_NOT_EXIST: '💀 Expense with this id does not exist!',
	EXPENSE_OPERATION_SUCCESS: (id, operation) => `✅ Expense (ID: ${id}) ${operation} successfully!`,
	EXPENSE_TOTAL: (total, month) => `✅ Total expenses${month ? ' for ' + MONTHS[month] : ''}: ${CURRENCY_SYMBOL}${total}`,
};
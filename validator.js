import { MESSAGES } from './constants/messages.constants.js';

export const validateDescription = description => {
	if (!description || description.length < 3) {
		throw new Error(MESSAGES.EXPENSE_DESCRIPTION_INVALID);
	}

	return true;
}

export const validateAmount = amount => {
	if (isNaN(amount)) {
		throw new Error(MESSAGES.EXPENSE_AMOUNT_INVALID);
	}

	return true;
}

export const validateExpenseId = id => {
	if (!Number.isInteger(id)) {
		throw new Error(MESSAGES.EXPENSE_ID_INVALID);
	}

	return true;
}

export const validateMonth = month => {
	if (!Number.isInteger(month) || month < 1 || month > 12) {
		throw new Error(MESSAGES.MONTH_INVALID);
	}

	return true;
}
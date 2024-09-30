import { storageService } from './storage.service.js';
import { MESSAGES } from '../constants/messages.constants.js';

class ExpenseService {
	storage;

	constructor(storage) {
		this.storage = storage;
	}

	async getExpenses() {
		return this.#readExpensesFromStorage();
	}

	async add(description, amount) {
		const expenses = await this.#readExpensesFromStorage();

		const expense = {
			id: this.#generateUniqueId(expenses),
			description,
			amount,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await this.storage.write([...expenses, expense]);

		return expense;
	}

	async update(expenseId, { description, amount }) {
		const expenses = await this.#readExpensesFromStorage();
		const expense = expenses.find(expense => expense.id === expenseId);

		if (!expense) {
			throw new Error(MESSAGES.EXPENSE_NOT_EXIST);
		}

		expense.updatedAt = new Date();

		if (description) {
			expense.description = description;
		}

		if (amount) {
			expense.amount = amount;
		}

		await this.storage.write(expenses);

		return expense;
	}

	async delete(expenseId) {
		let expenses = await this.#readExpensesFromStorage();
		const expense = expenses.find(expense => expense.id === expenseId);

		if (!expense) {
			throw new Error(MESSAGES.EXPENSE_NOT_EXIST);
		}

		expenses = expenses.filter(expense => expense.id !== expenseId);

		await this.storage.write(expenses);

		return expense;
	}

	async summary(month) {
		let expenses = await this.#readExpensesFromStorage();

		if (month) {
			expenses = expenses.filter(expense => (
				new Date(expense.createdAt).getMonth() + 1 === month
			));
		}

		return expenses.reduce((acc, expense) => acc + expense.amount, 0);
	}

	async #readExpensesFromStorage() {
		try {
			let expenses = await this.storage.read();

			return expenses;
		} catch (e) {
			// File does not exist. Skip error.
			return [];
		}
	}

	#generateUniqueId(expenses) {
		if (!expenses.length) 
			return 1;
		
		return expenses.reduce((acc, expense) => expense.id > acc ? expense.id : acc, 0) + 1;
	}
}

export const expenseService = new ExpenseService(storageService); 
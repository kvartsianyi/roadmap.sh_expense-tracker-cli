import { Command } from 'commander';

import { expenseService } from './expense.service.js';
import {
	validateAmount,
	validateDescription,
	validateExpenseId,
	validateMonth,
} from '../validator.js';
import { log, printExpenses, isUndefined } from '../utils.js';
import { CLI_COMMANDS } from '../constants/common.constants.js';
import { MESSAGES } from '../constants/messages.constants.js';

class CommandService {
	program;

	constructor() {
		this.program = new Command();
		this.init();
	}

	parse(args) {
		this.program.parse(args);
	}

	init() {
		this.initAddCommand();
		this.initUpdateCommand();
		this.initDeleteCommand();
		this.initListCommand();
		this.initSummaryCommand();
	}

	initAddCommand() {
		this.program
			.command(CLI_COMMANDS.ADD)
			.description('Add an expense')
			.requiredOption('--description <description>', 'Description of the expense', '')
			.requiredOption('--amount <amount>', 'Amount of the expense', parseFloat)
			.action(({ description, amount }) => this.add(description, amount))
	}

	initUpdateCommand() {
		this.program
			.command(CLI_COMMANDS.UPDATE)
			.description('Update an expense')
			.requiredOption('--id <id>', 'Id of expense', parseInt)
			.option('--description <description>', 'Description of the expense', '')
			.option('--amount <amount>', 'Amount of the expense', parseFloat)
			.action(({ id, description, amount }) => this.update(id, description, amount));
	}

	initDeleteCommand() {
		this.program
			.command(CLI_COMMANDS.DELETE)
			.description('Delete an expense')
			.requiredOption('--id <id>', 'Id of expense', parseInt)
			.action(({ id }) => this.delete(id));
	}

	initListCommand() {
		this.program
			.command(CLI_COMMANDS.LIST)
			.description('List of expenses')
			.action(() => this.list());
	}

	initSummaryCommand() {
		this.program
			.command(CLI_COMMANDS.SUMMARY)
			.description('Summary of expenses')
			.option('--month <month>', 'Summary for specific month', parseInt)
			.action(({ month }) => this.summary(month));
	}

	async add(description, amount) {
		try {
			validateDescription(description);
			validateAmount(amount);

			const expense = await expenseService.add(description, amount);
			log(MESSAGES.EXPENSE_OPERATION_SUCCESS(expense.id, 'added'));

		return expense;
		} catch (e) {
			log(e.message)
		}
	}

	async update(id, description, amount) {
		try {
			validateExpenseId(id);

			if (description) {
				validateDescription(description);
			}
			if (!isUndefined(amount)) {
				validateAmount(amount);
			}
			
			const expense = await expenseService.update(id, { description, amount});
			log(MESSAGES.EXPENSE_OPERATION_SUCCESS(expense.id, 'updated'));

		return expense;
		} catch (e) {
			log(e.message)
		}
	}

	async delete(id) {
		try {
			validateExpenseId(id);
			
			const expense = await expenseService.delete(id);
			log(MESSAGES.EXPENSE_OPERATION_SUCCESS(expense.id, 'deleted'));
		} catch (e) {
			log(e.message)
		}
	}

	async list() {
		try {
			const expenses = await expenseService.getExpenses();
			printExpenses(expenses);
		} catch (e) {
			log(e.message)
		}
	}

	async summary(month) {
		try {
			if (!isUndefined(month)) {
				validateMonth(month);
			}

			const total = await expenseService.summary(month);
			log(MESSAGES.EXPENSE_TOTAL(total, month));
		} catch (e) {
			log(e.message)
		}
	}
}

export const commandService = new CommandService();
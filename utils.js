import CONFIG from './config.js';
const { CURRENCY_SYMBOL } = CONFIG;

export const log = message => console.log(message);

export const printExpenses = expenses => {
	log('ID | Description               | Amount     | Date');
	log('---|---------------------------|------------|-----------');
	expenses.forEach(({ id, createdAt, description, amount }) => {
		log(`${String(id).padEnd(2)} | ${description.padEnd(25)} | ${`${CURRENCY_SYMBOL}${amount}`.padEnd(10)} | ${formatDate(new Date(createdAt))}`);
	});
}

export const formatDate = date => (
	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
);

export const isUndefined = value => typeof value === 'undefined';

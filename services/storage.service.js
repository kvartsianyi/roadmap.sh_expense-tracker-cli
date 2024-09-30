import fs from 'node:fs/promises';
import CONFIG from '../config.js';

class StorageService {
	filePath;

	constructor(filePath) {
		this.filePath = filePath;
	}

	async read() {
		const content = await fs.readFile(this.filePath);

		return JSON.parse(content);
	}

	async write(content) {
		return fs.writeFile(this.filePath, JSON.stringify(content, null, 2));
	}
}

export const storageService = new StorageService(CONFIG.STORAGE_FILEPATH);
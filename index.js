#!/usr/bin/env node

import { commandService } from './services/command.service.js';
import { log } from './utils.js';

try {
	commandService.parse(process.argv);
} catch (e) {
	log(e.message);
}

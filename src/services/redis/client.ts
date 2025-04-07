import { createClient, defineScript } from 'redis';
import { itemsKey, itemsByViewsKey, itemsViewsKey } from '$services/keys';
import { createIndexes } from './create-indexes';

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const incrementViewScript = readFileSync(
	path.join(__dirname, 'scripts', 'incrementView.lua'),
	'utf-8'
);
const unlockScript = readFileSync(path.join(__dirname, 'scripts', 'unlock.lua'), 'utf-8');

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	},
	password: process.env.REDIS_PW,
	scripts: {
		incrementView: defineScript({
			NUMBER_OF_KEYS: 3,
			SCRIPT: incrementViewScript,
			transformArguments(itemId: string, userId: string) {
				return [itemsViewsKey(itemId), itemsKey(itemId), itemsByViewsKey(), itemId, userId];
			},
			transformReply() {}
		}),
		unlock: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: unlockScript,
			transformArguments(key: string, token: string) {
				return [key, token];
			},
			transformReply(reply: any) {
				return reply;
			}
		})
	}
});

client.on('error', (err) => console.error(err));
client.connect();

client.on('connect', async () => {
	try {
		await createIndexes();
	} catch (err) {
		console.error(err);
	}
});

export { client };

import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({ url: process.env.REDIS_URL });

async function connect() {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
}

connect();

export default client;

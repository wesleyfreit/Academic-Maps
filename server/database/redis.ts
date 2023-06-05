import redis from "redis";

const client = redis.createClient();

connect();

async function connect() {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log(await client.ping());
}

export default client;

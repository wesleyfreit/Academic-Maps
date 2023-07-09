## Getting Started

#### Requisites: Node, NPM, Mongodb local or cloud Redis local or cloud, Neo4j loca or cloud.

1. Install the dependencies in the ./web and ./server directory with:
```bash
npm i
```
2. Create an ``.env`` file in the ./server directory with this ambient-variables:
```bash
MONGODB_URI = 'mongodb connection link' # Here goes the connection link with mongodb, can be an external or local connection.
REDIS_URL = 'redis connection link' # Here goes redis external link, but this is optional, if you don't want to use an external connection, you can leave this field empty to use the local redis.
URL_PERM = 'cors restriction link' # Here goes the access restriction to the origin of cors, but this is optional, if you don't want to restrict the cors, you can leave this field empty.
NEO4J_URI = 'neo4j connection link' # Here goes the connection link with neo4j, can be an external or local connection.
NEO4J_USER = 'neo4j user' # Here goes your neo4j connection user.
NEO4J_PASSWORD = 'neo4j password' # Here goes your neo4j connection password.
JWTSECRET = 'secret jwt' # Here goes the random jwt secret key.
```
3. Create an ``.env.local`` file in the ./web directory with this ambient-variables:
```bash
NEXT_PUBLIC_MAP_KEY = 'api maps key' # Here goes the google, maps api-key, but this is optional, you can leave this field empty.
NEXT_PUBLIC_URL_API = 'api server link' # Here goes the back-end api link, default is http://localhost:8080, if you change default port or use web deployment port, you change this.
```
4. Run the api server and web server, first navigate to the ./server directory and then to the ./web directory and run the following command:
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the frent-end server.

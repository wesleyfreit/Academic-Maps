import neo4j from "neo4j-driver";
import dotenv from "dotenv";
dotenv.config();

const neo4jURI = process.env.NEO4J_URI as string;
const neo4j_user = process.env.NEO4J_USER as string;
const neo4j_password = process.env.NEO4J_PASSWORD as string;

const driver = neo4j.driver(
  neo4jURI,
  neo4j.auth.basic(neo4j_user, neo4j_password)
);

export default driver;

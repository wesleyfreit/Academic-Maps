import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use(cors({origin: process.env.URL_PERM})); 
server.use(router);

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

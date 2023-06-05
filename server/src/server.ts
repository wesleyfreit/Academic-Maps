import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import router from "./routes";

const server = express();
const host = 8080;

dotenv.config();

server.use(express.json());
server.use(cors());
// server.use(router);

// server.get("/config", (req, res) => {
//   res.json(process.env.MAP_KEY);
// });

server.listen(host, () => {
  console.log(`Server is running in http://localhost:${host}`);
});

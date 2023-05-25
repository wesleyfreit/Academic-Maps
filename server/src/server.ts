import express from "express";

const server = express();

server.listen(8080, () => {
  console.log("HTTP server is running on https://localhost:8080");
});

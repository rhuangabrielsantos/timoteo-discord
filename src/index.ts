import express from "express";
import "dotenv/config";
import Client from "./Client";

new Client({ intents: 32767 }).init();

const server = express();
const PORT = process.env.PORT || 3000;

server.listen(PORT);

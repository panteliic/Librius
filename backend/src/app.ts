const express = require("express");
const cors = require("cors");

import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World! TypeORM is connected.");
  });

app.use(errorHandler);

export default app;

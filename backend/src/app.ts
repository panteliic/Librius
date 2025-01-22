const express = require("express");
const cors = require("cors");
import authRoutes from "./routes/auth.routes"
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World! TypeORM is connected.");
});

app.use(authRoutes);

app.use(errorHandler);

export default app;

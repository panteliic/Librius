const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser')
import authRoutes from "./routes/auth.routes"
import aiRoutes from "./routes/ai.routes"
import booksRoutes from "./routes/books.routes"
import { errorHandler } from "./middleware/errorHandler";
import passport from "./passport";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello, World! TypeORM is connected.");
});

app.use(authRoutes);
app.use(aiRoutes);
app.use(booksRoutes);

app.use(errorHandler);

export default app;

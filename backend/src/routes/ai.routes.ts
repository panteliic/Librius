import { prompt } from "../controllers/ai/gemini.conttroller";

const express = require("express");
const router = express.Router();

router.get("/api/prompt",prompt)

export default router;
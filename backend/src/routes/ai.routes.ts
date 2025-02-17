import { prompt } from "../controllers/ai/gemini.conttroller";

const express = require("express");
const router = express.Router();

router.post("/api/prompt",prompt)

export default router;
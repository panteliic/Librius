const express = require("express");
import { register, login } from "../controllers/auth.controller";
const router = express.Router();

router.post("/api/sign-up", register);
router.post("/api/sign-in", login);

export default router;

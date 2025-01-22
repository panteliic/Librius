const express = require("express")
import {register,login} from "../controllers/auth.controller"
const router = express.Router();

router.get("/api/sign-up",register);
router.get("/api/sign-in",login);

export default router;
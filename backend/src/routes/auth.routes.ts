const express = require("express");
import { login } from "../controllers/auth/login.controller";
import { logout } from "../controllers/auth/logout.controller";
import { refreshAccessToken } from "../controllers/auth/refreshToken.controller";
import { register } from "../controllers/auth/register.controller";
import passport from "../passport";

const router = express.Router();

router.post("/api/sign-up", register);
router.post("/api/sign-in", login);
router.post("/api/refresh-token", refreshAccessToken);
router.post("/api/logout", logout);


export default router;

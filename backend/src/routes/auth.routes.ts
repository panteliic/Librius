const express = require("express");

import {
  register,
  login,
  protectedRoute,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller";
import passport from "../passport";

const router = express.Router();

router.post("/api/sign-up", register);
router.post("/api/sign-in", login);
router.post("/api/refreshToken", refreshAccessToken);
router.post("/api/logout", logout);
router.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  protectedRoute
);

export default router;

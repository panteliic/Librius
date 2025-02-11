import { bookInfo } from "../controllers/Books/bookInfo.controller";
import {
  getFeaturedBooks,
  updateFeaturedBooks,
} from "../controllers/Books/featuerdBooks.controller";
import { BookController } from "../controllers/Books/migratebooks.controller.";
const express = require("express");
const router = express.Router();

router.get("/api/featuredBooks", getFeaturedBooks);
router.get("/api/bookInfo/:id", bookInfo);
router.get("/api/migratebooks", BookController.migrateBooks);
router.post("/api/updateFeaturedBooks", updateFeaturedBooks);

export default router;

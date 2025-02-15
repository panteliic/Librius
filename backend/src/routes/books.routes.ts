import { addFavorite } from "../controllers/Books/addFavorites";
import { bookInfo } from "../controllers/Books/bookInfo.controller";
import {
  getFeaturedBooks,
  updateFeaturedBooks,
} from "../controllers/Books/featuerdBooks.controller";
import { BookController } from "../controllers/Books/migratebooks.controller.";
const express = require("express");
const router = express.Router();

router.get("/api/featured-books", getFeaturedBooks);
router.get("/api/book-info/:id", bookInfo);
router.get("/api/migrate-books", BookController.migrateBooks );
router.post("/api/update-featured-books", updateFeaturedBooks);
router.post("/api/add-favorites", addFavorite);

export default router;

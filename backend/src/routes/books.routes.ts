import { addFavorite } from "../controllers/Books/addFavorites";
import { bookInfo } from "../controllers/Books/bookInfo.controller";
import { favorites } from "../controllers/Books/favoritesBooks";
import {
  getFeaturedBooks,
  updateFeaturedBooks,
} from "../controllers/Books/featuerdBooks.controller";
import { getBooks } from "../controllers/Books/getBooks";
import { BookController } from "../controllers/Books/migratebooks.controller.";
import { removeFavorite } from "../controllers/Books/removeFavorite";
import passport from "../passport";
const express = require("express");
const router = express.Router();

router.get("/api/featured-books/:userId", getFeaturedBooks);
router.get("/api/book-info/:id", bookInfo);
router.get("/api/migrate-books", BookController.migrateBooks);
router.post("/api/update-featured-books", updateFeaturedBooks);
router.post(
  "/api/add-favorite",
  passport.authenticate("jwt", { session: false }),
  addFavorite
);
router.get(
  "/api/favorites",
  passport.authenticate("jwt", { session: false }),
  favorites
);
router.delete(
  "/api/remove-favorite",
  passport.authenticate("jwt", { session: false }),
  removeFavorite
);
router.get("/api/books", getBooks);
export default router;

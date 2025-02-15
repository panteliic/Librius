import { addFavorite } from "../controllers/Books/addFavorites";
import { bookInfo } from "../controllers/Books/bookInfo.controller";
import { favorites } from "../controllers/Books/favoritesBooks";
import {
  getFeaturedBooks,
  updateFeaturedBooks,
} from "../controllers/Books/featuerdBooks.controller";
import { BookController } from "../controllers/Books/migratebooks.controller.";
import passport from "../passport";
const express = require("express");
const router = express.Router();

router.get("/api/featured-books/:userId", getFeaturedBooks);
router.get("/api/book-info/:id", bookInfo);
router.get("/api/migrate-books", BookController.migrateBooks);
router.post("/api/update-featured-books", updateFeaturedBooks);
router.post("/api/add-favorites",passport.authenticate("jwt", { session: false }), addFavorite);
router.get("/api/favorites",passport.authenticate("jwt", { session: false }), favorites);

export default router;

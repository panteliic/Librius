import { getFeaturedBooks, updateFeaturedBooks } from "../controllers/Books/featuerdBooks";
const express = require("express")
const router = express.Router();

router.get("/api/featuredBooks",getFeaturedBooks)
router.post("/api/updateFeaturedBooks",updateFeaturedBooks)


export default router;

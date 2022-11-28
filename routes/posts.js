const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", postsController.createPost);

router.get("/profile", ensureAuth, postsController.getProfile);

router.put("/completed/:id", postsController.completed);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

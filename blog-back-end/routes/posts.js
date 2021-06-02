const express = require("express");
const router = express.Router();
const { getPosts, addPost, updatePost, deletePost } = require("../controllers/postsController");

router.route("/").get(getPosts).post(addPost).delete(deletePost);
router.route("/edit").post(updatePost);

module.exports = router;

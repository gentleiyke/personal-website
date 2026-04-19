import express from "express";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.get("/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

router.post("/", auth, async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

export default router;
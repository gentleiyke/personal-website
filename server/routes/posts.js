import express from "express";
import mongoose from "mongoose";

import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();


function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}


/* ======================================================
   PUBLIC ROUTES
====================================================== */


/*
 * GET /api/posts
 *
 * Public website:
 * return published articles only.
 */

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({
      status: "published",
    }).sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    console.error(
      "Failed to fetch posts:",
      error
    );

    res.status(500).json({
      error: "Failed to fetch posts.",
    });
  }
});


/*
 * GET /api/posts/admin/all
 *
 * Admin dashboard:
 * return drafts and published articles.
 *
 * IMPORTANT:
 * This route must appear before /:slug.
 */

router.get(
  "/admin/all",
  auth,
  async (req, res) => {
    try {
      const posts = await Post.find().sort({
        updatedAt: -1,
      });

      res.json(posts);
    } catch (error) {
      console.error(
        "Failed to fetch admin posts:",
        error
      );

      res.status(500).json({
        error:
          "Failed to fetch articles.",
      });
    }
  }
);


/*
 * GET /api/posts/admin/:id
 *
 * Admin read:
 * allows viewing drafts.
 */

router.get(
  "/admin/:id",
  auth,
  async (req, res) => {
    try {
      if (
        !isValidObjectId(
          req.params.id
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid article ID.",
          });
      }

      const post =
        await Post.findById(
          req.params.id
        );

      if (!post) {
        return res
          .status(404)
          .json({
            error:
              "Article not found.",
          });
      }

      res.json(post);
    } catch (error) {
      console.error(
        "Failed to fetch article:",
        error
      );

      res.status(500).json({
        error:
          "Failed to fetch article.",
      });
    }
  }
);


/*
 * GET /api/posts/:slug
 *
 * Public article route.
 *
 * Drafts are intentionally invisible.
 */

router.get(
  "/:slug",
  async (req, res) => {
    try {
      const post =
        await Post.findOne({
          slug: req.params.slug,
          status: "published",
        });

      if (!post) {
        return res
          .status(404)
          .json({
            error:
              "Post not found.",
          });
      }

      res.json(post);
    } catch (error) {
      console.error(
        "Failed to fetch post:",
        error
      );

      res.status(500).json({
        error:
          "Failed to fetch post.",
      });
    }
  }
);


/* ======================================================
   CREATE
====================================================== */


/*
 * POST /api/posts
 */

router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const {
        title,
        slug,
        content,
        tags = [],
        status = "draft",
      } = req.body;


      if (
        !title?.trim() ||
        !slug?.trim() ||
        !content?.trim()
      ) {
        return res
          .status(400)
          .json({
            error:
              "Title, slug, and content are required.",
          });
      }


      if (
        ![
          "draft",
          "published",
        ].includes(status)
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid publication status.",
          });
      }


      const existingPost =
        await Post.findOne({
          slug:
            slug
              .trim()
              .toLowerCase(),
        });


      if (existingPost) {
        return res
          .status(409)
          .json({
            error:
              "An article with this slug already exists.",
          });
      }


      const post =
        await Post.create({
          title:
            title.trim(),

          slug:
            slug
              .trim()
              .toLowerCase(),

          content,

          tags,

          status,
        });


      res
        .status(201)
        .json(post);

    } catch (error) {
      console.error(
        "Failed to create article:",
        error
      );


      if (
        error.code === 11000
      ) {
        return res
          .status(409)
          .json({
            error:
              "An article with this slug already exists.",
          });
      }


      res.status(500).json({
        error:
          "Failed to create article.",
      });
    }
  }
);


/* ======================================================
   UPDATE
====================================================== */


/*
 * PUT /api/posts/:id
 */

router.put(
  "/:id",
  auth,
  async (req, res) => {
    try {
      if (
        !isValidObjectId(
          req.params.id
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid article ID.",
          });
      }


      const {
        title,
        slug,
        content,
        tags = [],
        status = "draft",
      } = req.body;


      if (
        !title?.trim() ||
        !slug?.trim() ||
        !content?.trim()
      ) {
        return res
          .status(400)
          .json({
            error:
              "Title, slug, and content are required.",
          });
      }


      if (
        ![
          "draft",
          "published",
        ].includes(status)
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid publication status.",
          });
      }


      const duplicateSlug =
        await Post.findOne({
          slug:
            slug
              .trim()
              .toLowerCase(),

          _id: {
            $ne: req.params.id,
          },
        });


      if (duplicateSlug) {
        return res
          .status(409)
          .json({
            error:
              "Another article already uses this slug.",
          });
      }


      const post =
        await Post.findByIdAndUpdate(
          req.params.id,
          {
            title:
              title.trim(),

            slug:
              slug
                .trim()
                .toLowerCase(),

            content,

            tags,

            status,
          },
          {
            new: true,
            runValidators: true,
          }
        );


      if (!post) {
        return res
          .status(404)
          .json({
            error:
              "Article not found.",
          });
      }


      res.json(post);

    } catch (error) {
      console.error(
        "Failed to update article:",
        error
      );


      if (
        error.code === 11000
      ) {
        return res
          .status(409)
          .json({
            error:
              "Another article already uses this slug.",
          });
      }


      res.status(500).json({
        error:
          "Failed to update article.",
      });
    }
  }
);


/* ======================================================
   DELETE
====================================================== */


/*
 * DELETE /api/posts/:id
 */

router.delete(
  "/:id",
  auth,
  async (req, res) => {
    try {
      if (
        !isValidObjectId(
          req.params.id
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid article ID.",
          });
      }


      const post =
        await Post.findByIdAndDelete(
          req.params.id
        );


      if (!post) {
        return res
          .status(404)
          .json({
            error:
              "Article not found.",
          });
      }


      res.json({
        success: true,
        message:
          "Article deleted.",
        id: post._id,
      });

    } catch (error) {
      console.error(
        "Failed to delete article:",
        error
      );

      res.status(500).json({
        error:
          "Failed to delete article.",
      });
    }
  }
);


export default router;
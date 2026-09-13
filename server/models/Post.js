import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    content: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function () {
  if (Array.isArray(this.tags)) {
    this.tags = [
      ...new Set(
        this.tags
          .map((tag) => tag.trim())
          .filter(Boolean)
      ),
    ];
  }
});

export default mongoose.model(
  "Post",
  postSchema
);
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    // SEO
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    subCategory: {
      type: String,
      trim: true,
    },

    // Article
    intro: {
      type: String,
    },

    sections: [
      {
        heading: String,
        content: String,
        example: String,
        importantPoints: [String],
        _id: false,
      },
    ],

    expertTips: [String],

    commonMistakes: [String],

    faq: [
      {
        question: String,
        answer: String,
        _id: false,
      },
    ],

    summary: String,

    conclusion: String,

    // SEO
    primaryKeyword: String,

    relatedKeywords: [String],

    seoTags: [String],

    // Status
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    publishedAt: {
      type: Date,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    // Thumbnail
    thumbnail: {
      url: {
        type: String,
        required: true,
        trim: true,
      },

      public_id: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

/* =====================================================
   PERFORMANCE INDEXES
===================================================== */

// Home page
blogSchema.index({
  status: 1,
  publishedAt: -1,
});

// Category filter
blogSchema.index({
  status: 1,
  category: 1,
});

// Sub Category filter
blogSchema.index({
  status: 1,
  category: 1,
  subCategory: 1,
});

// Slug page
blogSchema.index({
  slug: 1,
});

// Latest blogs
blogSchema.index({
  createdAt: -1,
});

// Search title
blogSchema.index({
  title: "text",
});

export const Blog = mongoose.model("Blog", blogSchema);
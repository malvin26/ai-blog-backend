import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    // ✅ SEO & URL
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
    description: {        // meta description (SEO)
      type: String,
      required: true,
    },

    // ✅ Category & Filter
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
    },

    // ✅ Article Body
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

    summary: { type: String },
    conclusion: { type: String },

    // ✅ SEO Tags
    primaryKeyword: { type: String },
    relatedKeywords: [String],
    seoTags: [String],

    // ✅ Publish Control
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: { type: Date },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
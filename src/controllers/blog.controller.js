
import { redis } from "../config/redis.js";
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";

/* ===========================================================
   Helpers
=========================================================== */

const parsePagination = (req) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 8, 1);
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

const cleanJSONString = (value) => {
  return value
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

/* ===========================================================
   Publish Blog
=========================================================== */

export const publishBlog = async (req, res) => {
  try {
    const { rawContent } = req.body;

    if (!rawContent) {
      return res.status(400).json({
        success: false,
        message: "rawContent is required",
      });
    }

    let parsed;

    if (typeof rawContent === "string") {
      parsed = JSON.parse(
        cleanJSONString(rawContent)
      );
    } else {
      parsed = rawContent;
    }

    if (!parsed.meta?.slug) {
      return res.status(400).json({
        success: false,
        message: "Slug missing",
      });
    }

    const exists = await Blog.findOne({
      slug: parsed.meta.slug,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message:
          "এই slug দিয়ে ইতিমধ্যে একটি Blog আছে।",
      });
    }

    const blog = await Blog.create({
      title: parsed.meta.title?.trim(),
      slug: parsed.meta.slug?.trim(),
      description: parsed.meta.description?.trim(),

      category: parsed.category?.trim(),
      subCategory: parsed.subCategory?.trim(),

      intro: parsed.article?.intro,

      sections:
        parsed.article?.sections || [],

      expertTips:
        parsed.article?.expertTips || [],

      commonMistakes:
        parsed.article?.commonMistakes || [],

      faq:
        parsed.article?.faq || [],

      summary:
        parsed.article?.summary,

      conclusion:
        parsed.article?.conclusion,

      primaryKeyword:
        parsed.keywords?.primary,

      relatedKeywords:
        parsed.keywords?.related || [],

      seoTags:
        parsed.seoTags || [],

      status: "published",

      publishedAt: new Date(),

      createdBy: req.user._id,
    });

    // =====================
    // Clear Redis Cache
    // =====================

    const blogKeys = await redis.keys("blogs:*");

    if (blogKeys.length > 0) {
      await redis.del(...blogKeys);
    }

    await redis.del("categories");
    await redis.del(`blog:${blog.slug}`);

    return res.status(201).json({
      success: true,
      message:
        "Blog published successfully.",

      blog: {
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
      },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof SyntaxError) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid JSON format",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};


export const getPublishedBlogs = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);
    const skip = (page - 1) * limit;

    const category = req.query.category?.trim() || "";
    const subCategory = req.query.subCategory?.trim() || "";
    const search = req.query.search?.trim() || "";

    const cacheKey = `blogs:${page}:${limit}:${category}:${subCategory}:${search}`;

    // ===========================
    // Redis Cache
    // ===========================
    console.time("redis");

    const cachedData = await redis.get(cacheKey);

    console.timeEnd("redis");

    if (cachedData) {
      console.log("✅ Blogs From Redis");
      return res.status(200).json(cachedData);
    }

    // ===========================
    // Mongo Query
    // ===========================
    const query = {
      status: "published",
    };

    if (category) {
      query.category = category;
    }

    if (subCategory) {
      query.subCategory = subCategory;
    }

    // Option 1: Full-text search (requires text index)
    if (search) {
      query.$text = {
        $search: search,
      };
    }

    console.time("mongo");

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select(
          "title slug description category subCategory thumbnail publishedAt"
        )
        .sort(
          search
            ? { score: { $meta: "textScore" } }
            : { publishedAt: -1 }
        )
        .skip(skip)
        .limit(limit)
        .lean(),

      Blog.countDocuments(query),
    ]);

    console.timeEnd("mongo");

    const response = {
      success: true,
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };

    // ===========================
    // Save Redis
    // ===========================
    await redis.set(cacheKey, response, {
      ex: 300,
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
/* ===========================================================
   Get Categories + SubCategories
=========================================================== */

export const getCategories = async (req, res) => {
  try {
    const cacheKey = "categories";

    // ===========================
    // Redis Cache Check
    // ===========================

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log("✅ Categories From Redis");

      return res.status(200).json(cachedData);
    }

    console.log("📦 Categories From MongoDB");

    const categories = await Blog.aggregate([
      {
        $match: {
          status: "published",
        },
      },
      {
        $group: {
          _id: "$category",
          topics: {
            $addToSet: "$subCategory",
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          topics: {
            $filter: {
              input: "$topics",
              as: "topic",
              cond: {
                $and: [
                  {
                    $ne: ["$$topic", null],
                  },
                  {
                    $ne: ["$$topic", ""],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);

    const response = {
      success: true,
      categories,
    };

    // ===========================
    // Save Redis Cache
    // ===========================

    await redis.set(cacheKey, response, {
      ex: 1800, // 30 Minutes
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Category API Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================================
   Get Single Blog
=========================================================== */
export const getSingleBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const cacheKey = `blog:${slug}`;

    // ===========================
    // Redis Cache
    // ===========================

    console.time("redis-single");

    const cachedData = await redis.get(cacheKey);

    console.timeEnd("redis-single");

    if (cachedData) {
      console.log("✅ Blog From Redis");

      return res.status(200).json(cachedData);
    }

    // ===========================
    // MongoDB
    // ===========================

    console.log("📦 Blog From MongoDB");

    console.time("mongo-single");

    const blog = await Blog.findOne({
      slug,
      status: "published",
    })
      .select(
        `
        title
        slug
        description
        category
        subCategory
        intro
        sections
        expertTips
        commonMistakes
        faq
        summary
        conclusion
        primaryKeyword
        relatedKeywords
        seoTags
        thumbnail
        publishedAt
        createdAt
      `
      )
      .lean();

    console.timeEnd("mongo-single");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const response = {
      success: true,
      blog,
    };

    // ===========================
    // Save Redis Cache
    // ===========================

    await redis.set(cacheKey, response, {
      ex: 3600, // 1 Hour
    });

    return res.status(200).json(response);

  } catch (error) {

    console.error("Single Blog Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });

  }
};

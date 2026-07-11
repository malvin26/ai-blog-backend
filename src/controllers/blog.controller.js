

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
      title: parsed.meta.title,
      slug: parsed.meta.slug,
      description: parsed.meta.description,

      category: parsed.category,
      subCategory: parsed.subCategory,

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
    // ================= DEBUG =================

    // ================= DEBUG =================

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const category = req.query.category;
    const subCategory = req.query.subCategory;
    const search = req.query.search;

    const query = {
      status: "published",
    };

    if (category) {
      query.category = category;
    }

    if (subCategory) {
      query.subCategory = subCategory;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }


    const total = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);



    return res.json({
      success: true,
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

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

  console.log(req.query);


  try {
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
                    $ne: [
                      "$$topic",
                      null,
                    ],
                  },
                  {
                    $ne: [
                      "$$topic",
                      "",
                    ],
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




    return res.status(200).json({
      success: true,
      categories,
    });

  } catch (error) {

    console.error(
      "Category API Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/* ===========================================================
   Get Single Blog
=========================================================== */

export const getSingleBlog = async (
  req,
  res
) => {

  try {

    console.log("req.query =", req.query);

    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      status: "published",
    }).lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};








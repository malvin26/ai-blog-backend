// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     // SEO
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // Category
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     subCategory: {
//       type: String,
//       trim: true,
//     },

//     // Article
//     intro: {
//       type: String,
//     },

//     sections: [
//       {
//         heading: String,
//         content: String,
//         example: String,
//         importantPoints: [String],
//         _id: false,
//       },
//     ],

//     expertTips: [String],

//     commonMistakes: [String],

//     faq: [
//       {
//         question: String,
//         answer: String,
//         _id: false,
//       },
//     ],

//     summary: String,

//     conclusion: String,

//     // SEO
//     primaryKeyword: String,

//     relatedKeywords: [String],

//     seoTags: [String],

//     // Status
//     status: {
//       type: String,
//       enum: ["draft", "published", "archived"],
//       default: "draft",
//       index: true,
//     },

//     publishedAt: {
//       type: Date,
//       index: true,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//     },

//     // Thumbnail
//     thumbnail: {
//       url: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       public_id: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// /* =====================================================
//    PERFORMANCE INDEXES
// ===================================================== */

// // Home page
// blogSchema.index({
//   status: 1,
//   publishedAt: -1,
// });

// // Category filter
// blogSchema.index({
//   status: 1,
//   category: 1,
// });

// // Sub Category filter
// blogSchema.index({
//   status: 1,
//   category: 1,
//   subCategory: 1,
// });



// // Latest blogs
// blogSchema.index({
//   createdAt: -1,
// });

// // Search title
// blogSchema.index({
//   title: "text",
// });

// export const Blog = mongoose.model("Blog", blogSchema);

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        // =====================================================
        // SEO
        // =====================================================

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


        // =====================================================
        // CATEGORY
        // =====================================================

        category: {
            type: String,
            required: true,
            trim: true,
        },

        subCategory: {
            type: String,
            trim: true,
        },


        // =====================================================
        // TOPIC
        // =====================================================

        /**
         * Main topic.
         *
         * Example:
         *
         * ChatGPT
         * Gemini AI
         * SEO
         * Programming
         * Web Development
         */
        topic: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },


        // =====================================================
        // ARTICLE ANGLE
        // =====================================================

        /**
         * Specific article angle.
         *
         * Same topic can have multiple angles.
         *
         * Example:
         *
         * ChatGPT
         * ├── Beginner Guide
         * ├── SEO Content Creation
         * ├── Productivity
         * ├── Education
         * └── Business
         */
        angle: {
            type: String,
            required: true,
            trim: true,
        },


        // =====================================================
        // SEARCH INTENT GROUP
        // =====================================================

        /**
         * Search intent group.
         *
         * Same:
         *
         * category + topic + intentGroup
         *
         * cannot exist more than once while
         * status is draft or published.
         *
         * Example:
         *
         * ChatGPT + core-overview
         * ChatGPT + seo
         * ChatGPT + education
         * ChatGPT + productivity
         * ChatGPT + business
         */
        intentGroup: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },


        // =====================================================
        // ARTICLE
        // =====================================================

        intro: {
            type: String,
        },

        sections: [
            {
                heading: {
                    type: String,
                },

                content: {
                    type: String,
                },

                example: {
                    type: String,
                },

                importantPoints: [
                    {
                        type: String,
                    },
                ],

                _id: false,
            },
        ],

        expertTips: [
            {
                type: String,
            },
        ],

        commonMistakes: [
            {
                type: String,
            },
        ],

        faq: [
            {
                question: {
                    type: String,
                },

                answer: {
                    type: String,
                },

                _id: false,
            },
        ],

        summary: {
            type: String,
        },

        conclusion: {
            type: String,
        },


        // =====================================================
        // SEO KEYWORDS
        // =====================================================

        primaryKeyword: {
            type: String,
            trim: true,
        },

        relatedKeywords: [
            {
                type: String,
                trim: true,
            },
        ],

        seoTags: [
            {
                type: String,
                trim: true,
            },
        ],


        // =====================================================
        // STATUS
        // =====================================================

        status: {
            type: String,

            enum: [
                "draft",
                "published",
                "archived",
            ],

            default: "draft",

            index: true,
        },


        // =====================================================
        // PUBLISHED AT
        // =====================================================

        publishedAt: {
            type: Date,
            index: true,
        },


        // =====================================================
        // CREATED BY
        // =====================================================

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },


        // =====================================================
        // THUMBNAIL
        // =====================================================

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


/* ============================================================
   PERFORMANCE INDEXES
============================================================ */


/**
 * Home page
 *
 * Latest blogs.
 */
blogSchema.index({
    status: 1,
    publishedAt: -1,
});


/**
 * Category filter.
 */
blogSchema.index({
    status: 1,
    category: 1,
});


/**
 * Sub-category filter.
 */
blogSchema.index({
    status: 1,
    category: 1,
    subCategory: 1,
});


/**
 * Topic filter.
 */
blogSchema.index({
    status: 1,
    topic: 1,
});


/**
 * Topic + Angle lookup.
 *
 * Used to find which angles
 * have already been used.
 */
blogSchema.index({
    category: 1,
    topic: 1,
    angle: 1,
});


/**
 * Latest blogs.
 */
blogSchema.index({
    createdAt: -1,
});


/**
 * Search title.
 */
blogSchema.index({
    title: "text",
});


/* ============================================================
   DUPLICATE INTENT PROTECTION
============================================================ */


/**
 * IMPORTANT
 * ============================================================
 *
 * This is the MAIN duplicate protection index.
 *
 * Same:
 *
 * category
 * +
 * topic
 * +
 * intentGroup
 *
 * can exist only ONCE while the blog status is:
 *
 * draft
 * OR
 * published
 *
 *
 * Example:
 *
 * Artificial Intelligence
 * +
 * ChatGPT
 * +
 * core-overview
 *
 * = ONE ACTIVE BLOG ONLY
 *
 *
 * But these are allowed:
 *
 * Artificial Intelligence
 * +
 * ChatGPT
 * +
 * seo
 *
 * Artificial Intelligence
 * +
 * ChatGPT
 * +
 * education
 *
 * Artificial Intelligence
 * +
 * ChatGPT
 * +
 * productivity
 *
 *
 * Archived blogs are NOT included
 * in this duplicate restriction.
 */
blogSchema.index(
    {
        category: 1,
        topic: 1,
        intentGroup: 1,
    },
    {
        name: "unique_category_topic_intent",

        unique: true,

        partialFilterExpression: {
            status: {
                $in: [
                    "draft",
                    "published",
                ],
            },
        },
    }
);


/* ============================================================
   EXPORT MODEL
============================================================ */

export const Blog = mongoose.model(
    "Blog",
    blogSchema
);


import express from "express";

import {
  adminLogin,
  adminRegister,
  aiContentGenerate,
} from "../controllers/admin.controller.js";

import { superAdmin } from "../middlewere/superAdmin.middlewere.js";

import {
  publishBlog,
  getPublishedBlogs,
  getSingleBlog,
  getCategories,
} from "../controllers/blog.controller.js";

import { upload } from "../middlewere/multer.middlewere.js";

import { adminLoginLimiter } from "../utils/helper.js";

const router = express.Router();


// =========================
// ADMIN REGISTER
// =========================
router
  .route("/xxx-admin-register")
  .post(adminRegister);


// =========================
// ADMIN LOGIN
// =========================
router
  .route("/xxx-admin-login")
  .post(adminLogin, adminLoginLimiter);


// =========================
// AI CONTENT GENERATE
// =========================
router
  .route("/xxx-admin-generate")
  .get(superAdmin, aiContentGenerate);


// =========================
// ADMIN PUBLISH BLOG
// =========================
router
  .route("/xxx-admin-publish")
  .post(
    superAdmin,

    upload.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
      {
        name: "affiliatedThumbnail",
        maxCount: 1,
      },
    ]),

    publishBlog
  );


// =========================
// GET PUBLISHED BLOGS
// =========================
router
  .route("/blogs")
  .get(getPublishedBlogs);


// =========================
// GET SINGLE BLOG
// =========================
router
  .route("/blogs/:slug")
  .get(getSingleBlog);


// =========================
// GET CATEGORIES
// =========================
router
  .route("/categories")
  .get(getCategories);


export default router;
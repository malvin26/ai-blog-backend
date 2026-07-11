import express from "express";
import { adminLogin, adminRegister, aiContentGenerate } from "../controllers/admin.controller.js";
import { superAdmin } from "../middlewere/superAdmin.middlewere.js";
import {
  publishBlog,
  getPublishedBlogs,
  getSingleBlog,
  getCategories,
} from "../controllers/blog.controller.js";


const router = express.Router();

router.route("/xxx-admin-register").post(adminRegister);
router.route("/xxx-admin-login").post(adminLogin);
router.route("/xxx-admin-generate").get(superAdmin, aiContentGenerate);
router.route("/xxx-admin-publish").post(superAdmin, publishBlog);
router.route("/blogs").get(getPublishedBlogs);
router.route("/blogs/:slug").get(getSingleBlog);
router.route("/categories").get(getCategories);



export default router;
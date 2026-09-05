import express from "express";
import { generateSitemap } from "../controllers/sitemap.controller.js";

const router = express.Router();

router.get("/sitemap.xml", generateSitemap);

export default router;
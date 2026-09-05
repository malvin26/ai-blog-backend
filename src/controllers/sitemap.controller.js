import { Blog } from "../models/blog.model.js";

const SITE_URL = "https://www.fastblog.online";

export const generateSitemap = async (req, res) => {
  try {
    // ============================
    // Get all published blogs
    // ============================
    const blogs = await Blog.find({
      status: "published",
    })
      .select("slug publishedAt updatedAt")
      .sort({ publishedAt: -1 })
      .lean();

    // ============================
    // Static Frontend Routes
    // ============================
    const staticPages = [
      {
        url: `${SITE_URL}/`,
        priority: "1.0",
        changefreq: "daily",
      },
      {
        url: `${SITE_URL}/about-us`,
        priority: "0.6",
        changefreq: "monthly",
      },
      {
        url: `${SITE_URL}/contact`,
        priority: "0.6",
        changefreq: "monthly",
      },
      {
        url: `${SITE_URL}/privacy-policy`,
        priority: "0.3",
        changefreq: "yearly",
      },
      {
        url: `${SITE_URL}/ad-policy`,
        priority: "0.3",
        changefreq: "yearly",
      },
      {
        url: `${SITE_URL}/terms`,
        priority: "0.3",
        changefreq: "yearly",
      },
    ];

    // ============================
    // Static URLs XML
    // ============================
    const staticXml = staticPages
      .map(
        (page) => `
  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("");

    // ============================
    // Dynamic Blog URLs
    // Frontend route = /blog/:slug
    // ============================
    const blogXml = blogs
      .map((blog) => {
        const date = blog.updatedAt || blog.publishedAt;

        const lastmod = date
          ? new Date(date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        return `
  <url>
    <loc>${SITE_URL}/blog/${encodeURIComponent(blog.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    // ============================
    // Final Sitemap XML
    // ============================
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${blogXml}
</urlset>`;

    // ============================
    // Response
    // ============================
    res
      .status(200)
      .type("application/xml")
      .send(sitemap);
  } catch (error) {
    console.error("Sitemap Error:", error);

    res
      .status(500)
      .type("application/xml")
      .send(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Unable to generate sitemap</message>
</error>`);
  }
}
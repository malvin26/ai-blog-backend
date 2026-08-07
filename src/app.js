import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import hpp from "hpp";

import { errorMiddleware } from "./middlewere/apiError.middlewere.js";
import adminRoute from "./routes/admin.routes.js";

const app = express();

/* =====================================================
   TRUST PROXY
===================================================== */

app.set("trust proxy", 1);


/* =====================================================
   SECURITY HEADERS
===================================================== */

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);


/* =====================================================
   CORS
===================================================== */

const allowedOrigins = [
    "https://ai-blog-frontend-0t4a.onrender.com",
    // "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without origin
            // Example: Postman / server-to-server
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },

        credentials: true,

        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);


/* =====================================================
   REQUEST BODY LIMIT
===================================================== */

app.use(
    express.json({
        limit: "2mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "2mb",
    })
);


/* =====================================================
   COOKIE
===================================================== */

app.use(cookieParser());




/* =====================================================
   HPP PROTECTION
===================================================== */

app.use(hpp());


/* =====================================================
   GLOBAL RATE LIMIT
===================================================== */

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 300,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        status: false,
        message: "Too many requests. Please try again later.",
    },
});

app.use(globalLimiter);


/* =====================================================
   REQUEST LOGGER
===================================================== */

app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.originalUrl} - ${req.ip}`
    );

    next();
});


/* =====================================================
   ROUTES
===================================================== */

app.use(adminRoute);


/* =====================================================
   404 HANDLER
===================================================== */

app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: "Route not found",
    });
});


/* =====================================================
   ERROR HANDLER
===================================================== */

app.use((err, req, res, next) => {
    console.error("ERROR:", err.message);

    res.status(err.statusCode || 500).json({
        status: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Internal server error"
                : err.message,
    });
});


/* =====================================================
   API ERROR MIDDLEWARE
===================================================== */

app.use(errorMiddleware);


export default app;
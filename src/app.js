import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewere/apiError.middlewere.js";

import adminRoute from "./routes/admin.routes.js"
import { Blog } from "./models/blog.model.js";


const app = express();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://ai-blog-frontend-0t4a.onrender.com"
        ],
        credentials: true,
    })
);
app.use(cookieParser());



// ============ route define ===========


app.use(adminRoute);



app.use((err, req, res, next) => {
    console.error("FULL STACK:", err.stack);   // ⚠️ টেম্পোরারি
    res.status(err.statusCode || 500).json({
        status: false,
        message: err.message,
    });
});


// api error middlewere 
app.use(errorMiddleware)


export default app;
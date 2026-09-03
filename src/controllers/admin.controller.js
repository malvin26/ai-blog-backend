// import bcrypt from "bcrypt";
// import { gemini } from "../ai-service/gemini.ai.js";
// import { Admin } from "../models/admin.models.js";
// import {
//     adminAccessTokenGenerate,
//     ApiError,
//     ApiSuccess,
//     gmailChecker,
//     passwordHashing,
//     passwordPattern,
//     tryCatchHandle,
// } from "../utils/helper.js";

// // =========================
// // REGISTER
// // =========================
// export const adminRegister = tryCatchHandle(async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         throw new ApiError("All fields required", 400);
//     }

//     if (!gmailChecker(email)) {
//         throw new ApiError("Invalid Gmail", 400);
//     }

//     const exist = await Admin.findOne({ email });

//     if (exist) {
//         throw new ApiError("Email already exists", 400);
//     }

//     if (!passwordPattern(password)) {
//         throw new ApiError("Weak password", 400);
//     }

//     const hashed = await passwordHashing(password);

//     const admin = await Admin.create({
//         name,
//         email,
//         password: hashed,
//         role: "super admin",
//     });

//     const accessToken = adminAccessTokenGenerate({
//         payloadData: admin._id,
//     });

//     admin.accessToken = accessToken;
//     await admin.save();

//     return res.status(201).json(
//         new ApiSuccess("Registered", 201, {
//             admin,
//             accessToken,
//         })
//     );
// });

// // =========================
// // ADMIN LOGIN
// // =========================
// export const adminLogin = tryCatchHandle(async (req, res) => {
//     const { email, password } = req.body;

//     // Validate fields
//     if (!email || !password) {
//         throw new ApiError("Email and password are required", 400);
//     }

//     // Normalize email
//     const normalizedEmail = email.trim().toLowerCase();

//     // Find admin
//     const admin = await Admin.findOne({
//         email: normalizedEmail,
//     });

//     // Same error for both cases
//     if (!admin) {
//         throw new ApiError("Invalid credentials", 401);
//     }

//     // Compare password
//     const match = await bcrypt.compare(
//         password,
//         admin.password
//     );

//     if (!match) {
//         throw new ApiError("Invalid credentials", 401);
//     }

//     // Generate access token
//     const accessToken = adminAccessTokenGenerate({
//         payloadData: admin._id,
//     });

//     // Save token if your middleware checks it from DB
//     admin.accessToken = accessToken;

//     await admin.save();

//     // Don't send password or sensitive fields
//     const adminData = {
//         _id: admin._id,
//         email: admin.email,
//         role: admin.role,
//     };

//     // Secure HTTP-only cookie
//     res.cookie("adminAccessToken", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite:
//             process.env.NODE_ENV === "production"
//                 ? "none"
//                 : "lax",
//         maxAge: 24 * 60 * 60 * 1000,
//     });

//     return res.status(200).json(
//         new ApiSuccess("Login success", 200, {
//             admin: adminData,
//         })
//     );
// });

// // =========================
// // GENERATE AI BLOG
// // =========================
// export const aiContentGenerate = tryCatchHandle(async (req, res) => {
//     const response = await gemini();

//     const rawText =
//         response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     const usage = response?.usageMetadata;

//     const cleanedText = rawText
//         ?.replace(/```json/g, "")
//         ?.replace(/```/g, "")
//         ?.trim();

//     let result;

//     try {
//         result = JSON.parse(cleanedText);
//     } catch {
//         result = cleanedText;
//     }

//     return res.status(200).json(
//         new ApiSuccess("Blog generated", 200, {
//             result,
//             usage: {
//                 prompt_tokens: usage?.promptTokenCount || 0,
//                 completion_tokens: usage?.candidatesTokenCount || 0,
//                 total_tokens: usage?.totalTokenCount || 0,
//                 thoughts_tokens: usage?.thoughtsTokenCount || 0,
//             },
//         })
//     );
// });


import bcrypt from "bcrypt";

import { gemini } from "../ai-service/gemini.ai.js";

import {
    categoryAndTopicSelector,
} from "../ai-service/gemini.prompt.js";

import {
    getAvailableAngle,
    checkExactDuplicate,
} from "../ai-service/blog.duplicate.js";

import { Admin } from "../models/admin.models.js";

import {
    adminAccessTokenGenerate,
    ApiError,
    ApiSuccess,
    gmailChecker,
    passwordHashing,
    passwordPattern,
    tryCatchHandle,
} from "../utils/helper.js";


// =========================
// REGISTER
// =========================
export const adminRegister = tryCatchHandle(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError("All fields required", 400);
    }

    if (!gmailChecker(email)) {
        throw new ApiError("Invalid Gmail", 400);
    }

    const exist = await Admin.findOne({ email });

    if (exist) {
        throw new ApiError("Email already exists", 400);
    }

    if (!passwordPattern(password)) {
        throw new ApiError("Weak password", 400);
    }

    const hashed = await passwordHashing(password);

    const admin = await Admin.create({
        name,
        email,
        password: hashed,
        role: "super admin",
    });

    const accessToken = adminAccessTokenGenerate({
        payloadData: admin._id,
    });

    admin.accessToken = accessToken;

    await admin.save();

    return res.status(201).json(
        new ApiSuccess("Registered", 201, {
            admin,
            accessToken,
        })
    );
});


// =========================
// ADMIN LOGIN
// =========================
export const adminLogin = tryCatchHandle(async (req, res) => {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
        throw new ApiError(
            "Email and password are required",
            400
        );
    }

    // Normalize email
    const normalizedEmail = email
        .trim()
        .toLowerCase();

    // Find admin
    const admin = await Admin.findOne({
        email: normalizedEmail,
    });

    // Same error for both cases
    if (!admin) {
        throw new ApiError(
            "Invalid credentials",
            401
        );
    }

    // Compare password
    const match = await bcrypt.compare(
        password,
        admin.password
    );

    if (!match) {
        throw new ApiError(
            "Invalid credentials",
            401
        );
    }

    // Generate access token
    const accessToken =
        adminAccessTokenGenerate({
            payloadData: admin._id,
        });

    // Save token
    admin.accessToken = accessToken;

    await admin.save();

    // Don't send password or sensitive fields
    const adminData = {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
    };

    // Secure HTTP-only cookie
    res.cookie(
        "adminAccessToken",
        accessToken,
        {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",

            maxAge:
                24 * 60 * 60 * 1000,
        }
    );

    return res.status(200).json(
        new ApiSuccess(
            "Login success",
            200,
            {
                admin: adminData,
            }
        )
    );
});


// =====================================================
// GENERATE AI BLOG
// =====================================================
export const aiContentGenerate = tryCatchHandle(
    async (req, res) => {

        // =================================================
        // STEP 1
        // Random category + random topic
        // =================================================
        let selected = null;


        // =================================================
        // STEP 2
        // Find a topic which still has an unused intent
        // =================================================
        for (let attempt = 0; attempt < 20; attempt++) {

            const {
                cat,
                topic,
                isTrending,
            } = categoryAndTopicSelector();


            // ---------------------------------------------
            // Find available angle
            // ---------------------------------------------
            const availableAngle =
                await getAvailableAngle({
                    category: cat,
                    topic,
                });


            // ---------------------------------------------
            // If this topic has no available intent,
            // try another random topic
            // ---------------------------------------------
            if (!availableAngle) {
                continue;
            }


            // ---------------------------------------------
            // Save selected information
            // ---------------------------------------------
            selected = {
                cat,
                topic,
                isTrending,

                angle:
                    availableAngle.angle,

                intentGroup:
                    availableAngle.intentGroup,
            };


            break;
        }


        // =================================================
        // STEP 3
        // No available topic/angle found
        // =================================================
        if (!selected) {
            throw new ApiError(
                "No unused blog angle is available right now",
                409
            );
        }


        // =================================================
        // STEP 4
        // Send selected topic + angle to Gemini
        // =================================================
        const response = await gemini({
            cat: selected.cat,

            topic: selected.topic,

            isTrending:
                selected.isTrending,

            angle: selected.angle,

            intentGroup:
                selected.intentGroup,
        });


        // =================================================
        // STEP 5
        // Get Gemini raw response
        // =================================================
        const rawText =
            response
                ?.candidates?.[0]
                ?.content
                ?.parts?.[0]
                ?.text;


        if (!rawText) {
            throw new ApiError(
                "Gemini returned empty content",
                502
            );
        }


        // =================================================
        // STEP 6
        // Clean Gemini markdown code fences
        // =================================================
        const cleanedText = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();


        // =================================================
        // STEP 7
        // Parse JSON
        // =================================================
        let result;

        try {
            result = JSON.parse(cleanedText);
        } catch (error) {
            throw new ApiError(
                "Gemini returned invalid JSON",
                502
            );
        }


        // =================================================
        // STEP 8
        // Backend-authoritative data
        //
        // Gemini যেন category/topic/angle/intentGroup
        // পরিবর্তন করতে না পারে
        // =================================================
        result.category = selected.cat;

        result.subCategory =
            selected.topic;

        result.topic =
            selected.topic;

        result.angle =
            selected.angle;

        result.intentGroup =
            selected.intentGroup;


        // =================================================
        // STEP 9
        // Get generated title
        // =================================================
        const generatedTitle =
            result?.meta?.title ||
            result?.article?.title ||
            result?.title ||
            "";


        // =================================================
        // STEP 10
        // Get generated slug
        // =================================================
        const generatedSlug =
            result?.meta?.slug ||
            result?.slug ||
            "";


        // =================================================
        // STEP 11
        // Exact duplicate check
        //
        // Gemini যদি আগের title/slug বানায়,
        // তাহলে এখানেই ধরা পড়বে
        // =================================================
        const duplicate =
            await checkExactDuplicate({
                title: generatedTitle,
                slug: generatedSlug,
            });


        if (duplicate) {
            throw new ApiError(
                "A blog with the same title or slug already exists",
                409
            );
        }


        // =================================================
        // STEP 12
        // Gemini usage information
        // =================================================
        const usage =
            response?.usageMetadata;


        // =================================================
        // STEP 13
        // Return generated blog
        // =================================================
        return res.status(200).json(
            new ApiSuccess(
                "Blog generated",
                200,
                {
                    result,

                    selection: {
                        category:
                            selected.cat,

                        topic:
                            selected.topic,

                        isTrending:
                            selected.isTrending,

                        angle:
                            selected.angle,

                        intentGroup:
                            selected.intentGroup,
                    },

                    usage: {
                        prompt_tokens:
                            usage?.promptTokenCount ||
                            0,

                        completion_tokens:
                            usage?.candidatesTokenCount ||
                            0,

                        total_tokens:
                            usage?.totalTokenCount ||
                            0,

                        thoughts_tokens:
                            usage?.thoughtsTokenCount ||
                            0,
                    },
                }
            )
        );
    }
);


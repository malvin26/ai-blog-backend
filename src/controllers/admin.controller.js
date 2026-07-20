import bcrypt from "bcrypt";
import { gemini } from "../ai-service/gemini.ai.js";
import { Admin } from "../models/admin.models.js";
import {
    adminAccessTokenGenerate,
    ApiError,
    ApiSuccess,
    gmailChacker,
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

    if (!gmailChacker(email)) {
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
// LOGIN
// =========================
export const adminLogin = tryCatchHandle(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError("Missing fields", 400);
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new ApiError("Invalid credentials", 401);
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
        throw new ApiError("Invalid credentials", 401);
    }

    const accessToken = adminAccessTokenGenerate({
        payloadData: admin._id,
    });

    admin.accessToken = accessToken;
    await admin.save();

    return res.status(200).json(
        new ApiSuccess("Login success", 200, {
            admin,
            accessToken,
        })
    );
});

// =========================
// GENERATE AI BLOG
// =========================
export const aiContentGenerate = tryCatchHandle(async (req, res) => {
    const response = await gemini();

    const rawText =
        response?.candidates?.[0]?.content?.parts?.[0]?.text;

    const usage = response?.usageMetadata;

    const cleanedText = rawText
        ?.replace(/```json/g, "")
        ?.replace(/```/g, "")
        ?.trim();

    let result;

    try {
        result = JSON.parse(cleanedText);
    } catch {
        result = cleanedText;
    }

    return res.status(200).json(
        new ApiSuccess("Blog generated", 200, {
            result,
            usage: {
                prompt_tokens: usage?.promptTokenCount || 0,
                completion_tokens: usage?.candidatesTokenCount || 0,
                total_tokens: usage?.totalTokenCount || 0,
                thoughts_tokens: usage?.thoughtsTokenCount || 0,
            },
        })
    );
});
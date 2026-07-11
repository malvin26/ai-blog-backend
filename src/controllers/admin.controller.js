import { gemini } from "../ai-service/gemini.ai.js";
import { Admin } from "../models/admin.models.js";
import { adminAccessTokenGenerate, ApiError, ApiSuccess, gmailChacker, passwordHashing, passwordPattern, tryCatchHandle } from "../utils/helper.js";
import bcrypt from "bcrypt";



// REGISTER
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

    const token = adminAccessTokenGenerate({
        payloadData: admin._id,
    });

    admin.accessToken = token;
    await admin.save();

    return res
        .cookie("xxx_super_admin", token, {
            httpOnly: true,
            sameSite: "lax",
        })
        .status(201)
        .json(
            new ApiSuccess("Registered", 201, {
                admin,
                accessToken: token,
            })
        );
});

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

    // TOKEN GENERATE
    const accessToken = await adminAccessTokenGenerate({
        payloadData: admin._id,
    });

    admin.accessToken = accessToken;
    await admin.save();

    // COOKIE SET + RESPONSE (FIXED)
    res.cookie("xxx_super_admin", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(
        new ApiSuccess("Login success", 200, {
            admin,
            accessToken,
        })
    );
});




export const aiContentGenerate = tryCatchHandle(async (req, res) => {
    const response = await gemini();

    // console.log("req ...admin", req.user);


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

    return res.status(201).json(
        new ApiSuccess("blog generated", 201, {
            result,
            usage: {
                prompt_tokens: usage?.promptTokenCount || 0,
                completion_tokens: usage?.candidatesTokenCount || 0,
                total_tokens: usage?.totalTokenCount || 0,
                thoughts_tokens: usage?.thoughtsTokenCount || 0
            }
        })
    );
});
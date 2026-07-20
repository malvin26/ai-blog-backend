import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import { Admin } from "../models/admin.models.js";
import { ApiError } from "../utils/helper.js";

export const superAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError("Super admin token missing", 403);
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const admin = await Admin.findById(decoded.payloadData);

        if (!admin) {
            throw new ApiError("Admin not found", 401);
        }

        if (admin.role !== "super admin") {
            throw new ApiError("Only super admin allowed", 403);
        }

        req.user = admin;

        next();
    } catch (error) {
        next(error);
    }
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";


/* =====================================================
   TRY CATCH HANDLER
===================================================== */

export const tryCatchHandle = (fn) => {
    return (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            .catch(next);
    };
};


/* =====================================================
   API ERROR
===================================================== */

export class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);

        this.status = false;
        this.statusCode = statusCode;

        Error.captureStackTrace(
            this,
            this.constructor
        );
    }
}


/* =====================================================
   API SUCCESS
===================================================== */

export class ApiSuccess {
    constructor(message, statusCode, data = null) {
        this.status = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}


/* =====================================================
   GMAIL VALIDATION
===================================================== */

const gmailRegex =
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const gmailChecker = (gmail) => {

    if (typeof gmail !== "string") {
        return false;
    }

    return gmailRegex.test(
        gmail.trim().toLowerCase()
    );
};


/* =====================================================
   PASSWORD VALIDATION
===================================================== */

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const passwordPattern = (password) => {

    if (typeof password !== "string") {
        return false;
    }

    return passwordRegex.test(password);
};


/* =====================================================
   PASSWORD HASHING
===================================================== */

export const passwordHashing = async (password) => {
    return bcrypt.hash(password, 12);
};


/* =====================================================
   ADMIN JWT
===================================================== */

export const adminAccessTokenGenerate = (payload) => {

    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};


/* =====================================================
   ADMIN LOGIN RATE LIMIT
===================================================== */

import rateLimit from "express-rate-limit";

export const adminLoginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 4,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        status: false,
        message: "Too many login attempts. Try again later.",
    },

});
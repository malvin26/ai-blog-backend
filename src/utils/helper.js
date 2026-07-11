import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";


export const tryCatchHandle = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
};


export class ApiError extends Error {

    constructor(message, statusCode) {
        super(message);

        this.status = false;
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);


    }

}

export class ApiSuccess {

    constructor(message, statusCode, data) {
        this.status = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

}

//  only gmail regex check hbe .............
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const gmailChacker = (gmail) => {
    return gmailRegex.test(gmail)
}


const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const passwordPattern = (password) => {

    return passwordRegex.test(password)

}

// password hashing fn ....... 

export const passwordHashing = async (password) => {
    return await bcrypt.hash(password, 10)
}


// .... admin access token create ................


export const adminAccessTokenGenerate = async (payload) => {

    return await jwt.sign(payload, JWT_SECRET)

}
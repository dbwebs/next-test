import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        //removed next param
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not the user of this account"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    console.log("Verifying Admin")
    verifyToken(req, res, () => {
        //removed next param
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not an authorized administrator"))
        }
    })
}
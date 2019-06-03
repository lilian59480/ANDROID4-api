import express from "express";
import jwt from "jsonwebtoken";
import constants from "../utils/constants";

import config from "../config";

const jwtOptions = constants.jwtVerifyOptions;

const middlewareAuthJwt: express.Handler = (request, response, next) => {

    const token: string = request.headers.authorization || "";

    if (token.length === 0) {
        console.error("Empty header");
        return response.status(400).json({
            status: "Missing Authorization header"
        });
    }

    // Check for correct header
    if (!token.startsWith('Bearer ')) {
        console.error("Invalid header", token);
        return response.status(400).json({
            status: "Invalid Authorization header"
        });
    }

    // Check if token is valid
    try {
        const tokenContent = jwt.verify(token.slice(7), config.tokenSecret, jwtOptions);
        console.log(tokenContent);
        response.locals.token = tokenContent;
    } catch (error) {
        console.error(error.stack);
        return response.status(500).json({
            status: "error"
        });
    }

    return next();
};

export default middlewareAuthJwt;

import express from "express";

const middlewareLogRequest: express.Handler = (request, _response, next) => {
    console.log(`${request.method} ${request.originalUrl}`);
    console.log(request.body);
    return next();
};

export default middlewareLogRequest;

import express from "express";

const middlewareSetHeaders: express.Handler = (_request, response, next) => {
    response.setHeader("Api-version", "1.0.0");
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.setHeader("Accept", "application/json");
    return next();
};

export default middlewareSetHeaders;

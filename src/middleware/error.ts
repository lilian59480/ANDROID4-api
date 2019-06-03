import express from "express";

const middlewareError: express.ErrorRequestHandler = (error, _request, response, _next) => {
    console.error(error);
    return response.status(500).json({
        status: "error"
    });
};

export default middlewareError;

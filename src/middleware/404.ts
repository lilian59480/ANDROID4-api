import express from "express";

const middleware404: express.Handler = (_request, response, _next) => {
    console.warn("404");
    return response.status(404).json({
        status: "not found"
    });
};

export default middleware404;

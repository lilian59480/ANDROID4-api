import express from "express";

import mysql from "../../repository/mysql";

const removeUser: express.Handler = (request, response, _next) => {

    try {
        if (!request.params.id || isNaN(parseInt(request.params.id, 10))) {
            throw "";
        }
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    const id: number = parseInt(request.params.id, 10);

    return mysql.query("DELETE FROM users WHERE id = ?;",
    [
        id
    ],
    (error, _results, _fields) => {
        if (error) {
            throw error;
        }

        return response.json({
            status: "ok",
        });

    });
}

export default removeUser;

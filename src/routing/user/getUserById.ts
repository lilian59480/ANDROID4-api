import express from "express";

import mysql from "../../repository/mysql";
import { User } from "../../utils/types";

const getUserById: express.Handler = (request, response, _next) => {
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

    return mysql.query(
        "SELECT id, pseudo AS 'username', passe AS 'password', blacklist, admin, connecte AS 'connected', couleur AS 'colour' FROM users WHERE id = ?;",
        [
            id
        ],
        (error, results, _fields) => {
            if (error) {
                throw error;
            }

            if (results.length !== 1) {
                return response.status(404).json({
                    status: "User not found"
                });
            }
            const user: User = results[0];

            return response.json({
                status: "ok",
                user
            });
        });
};

export default getUserById;

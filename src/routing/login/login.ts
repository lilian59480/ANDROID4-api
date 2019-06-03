import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import mysql from "../../repository/mysql";
import config from "../../config";
import constants from "../../utils/constants";

const loginRoute: express.Handler = (request, response, _next) => {

    if (typeof request.body !== "object") {
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    if (!request.body.username || !request.body.password) {
        return response.status(400).json({
            status: "Missing arguments. Required: username, password"
        });
    }

    const username: string = request.body.username;
    const password: string = request.body.password;

    return mysql.query(
        "SELECT id, pseudo, passe FROM users WHERE pseudo = ?",
        [
            username
        ],
        (error, results, _fields) => {
            if (error) {
                throw error;
            }

            const token = jwt.sign(
                {
                    username: username,
                },
                config.tokenSecret,
                constants.jwtSignOptions
            );

            if (results.length === 1) {

                const id: number = results[0].id;
                const passwordHashed: string = results[0].passe;

                if (bcrypt.compareSync(password, passwordHashed)) {
                    return response.json({
                        status: "ok",
                        token,
                        id
                    });
                }
            }

            return response.status(400).json({
                status: "Invalid credentials"
            });
        });

};

export default loginRoute;

import express from "express";
import bcrypt from "bcrypt";

import mysql from "../../repository/mysql";
import { User } from "../../utils/types";
import merge from "../../utils/merge";

const patchUser: express.Handler = (request, response, _next) => {

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

    if (typeof request.body !== "object") {
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    const requestUser: User = {
        username: request.body.username,
        password: request.body.password,
        blacklist: request.body.blacklist,
        admin: request.body.admin,
        connected: request.body.connected,
        colour: request.body.colour,
    }

    if (request.body.password) {
        requestUser.password = bcrypt.hashSync(request.body.password, 15);
    }

    const id: number = parseInt(request.params.id, 10);

    return mysql.query(
        "SELECT id, pseudo AS 'username', passe AS 'password', blacklist, admin, connecte AS 'connected', couleur AS 'colour'FROM users WHERE id = ?;",
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

            const merged: User = merge(requestUser, user);

            return mysql.query(
                "UPDATE users SET pseudo = ?, passe = ?, blacklist = ?, admin = ?, connecte = ?, couleur = ? WHERE id = ?;",
                [
                    merged.username,
                    merged.password,
                    merged.blacklist,
                    merged.admin,
                    merged.connected,
                    merged.colour,
                    id
                ],
                (error, _results, _fields) => {
                    if (error) {
                        throw error;
                    }

                    return response.json({
                        status: "ok"
                    });
                });
        });

};

export default patchUser;

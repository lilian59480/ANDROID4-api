import express from "express";

import mysql from "../../repository/mysql";
import { User } from "../../utils/types";

const getAllUsers: express.Handler = (_request, response, _next) => {
    return mysql.query(
        "SELECT id, pseudo AS 'username', blacklist, admin, connecte AS 'connected', couleur AS 'colour' FROM users",
        (error, results, _fields) => {
            if (error) {
                throw error;
            }

            const users: User[] = Array.from(results).map((elt: any): User => {
                return {
                    id: elt.id,
                    username: elt.username,
                    blacklist: !!elt.blacklist,
                    admin: !!elt.admin,
                    connected: !!elt.connected,
                    colour: elt.colour
                };
            });

            return response.json({
                status: "ok",
                users
            });
        });
};

export default getAllUsers;

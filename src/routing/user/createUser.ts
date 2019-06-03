import express from "express";
import { User } from "../../utils/types";
import mysql from "../../repository/mysql";
import bcrypt from "bcrypt";



const createUser : express.Handler = (request, response, _next) => {


    if (typeof request.body !== "object") {
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    const user: User = {
        username: request.body.username ,
        password: request.body.password,
        blacklist: request.body.blacklist,
        admin : request.body.admin,
        connected: request.body.connected,
        colour: request.body.colour,
    }

    const hash = bcrypt.hashSync(user.password, 15);
        user.password = hash;
        return mysql.query("INSERT INTO users SET pseudo = ?, passe = ?, blacklist = ?, admin = ?, connecte = ?, couleur = ?", [
            user.username,
            user.password,
            user.blacklist,
            user.admin,
            user.connected,
            user.colour,
          ], (error, _results, _fields) => {
            if (error) {
                throw error;
            }
        return response.json({
            status: "ok",
        });
    });
}


export default createUser;
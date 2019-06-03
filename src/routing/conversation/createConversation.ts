import express from "express";
import { Conversation } from "../../utils/types";
import mysql from "../../repository/mysql";



const createUser : express.Handler = (request, response, _next) => {
    
    if (typeof request.body !== "object") {
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    const conversation: Conversation = {
        active: request.body.active ,
        theme: request.body.theme,
    }


        return mysql.query("INSERT INTO conversations SET active = ?, theme = ?", [
            conversation.active,
            conversation.theme,

          ], (error, _results, _fields) => {
            if (error) {
                throw error;
            }
        return response.json({
            status: "ok",
            conversation
        });
    });
}


export default createUser;
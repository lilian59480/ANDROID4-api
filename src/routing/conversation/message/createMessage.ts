import express from "express";

import mysql from "../../../repository/mysql";
import { Message } from "../../../utils/types";



const createMessage : express.Handler = (request, response, _next) => {
    
    if (typeof request.body !== "object") {
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    const message: Message = {
        idConversation: request.body.idConversation,
        idUser: request.body.idUser,
        message: request.body.message
    }


        return mysql.query("INSERT INTO messages SET idConversation = ?, idAuteur = ?, contenu = ?;", [
            message.idConversation,
            message.idUser,
            message.message

          ], (error, _results, _fields) => {
            if (error) {
                throw error;
            }
        return response.json({
            status: "ok",
            message
        });
    });
}


export default createMessage;

import express from "express";

import mysql from "../../../repository/mysql";
import { Message } from "../../../utils/types";

const getAllMessages: express.Handler = (request, response, _next) => {

    try {
        if (!request.params.idconv || isNaN(parseInt(request.params.idconv, 10))) {
            throw "";
        }
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: "Invalid arguments"
        });
    }

    const idconv: number = parseInt(request.params.idconv, 10);

    return mysql.query(
        "SELECT id, idAuteur as 'idUser', contenu as 'message' FROM messages WHERE idConversation = ?",
        [
            idconv
        ],
        (error, results, _fields) => {
            if (error) {
                throw error;
            }

            const messages: Message[] = Array.from(results).map((elt: any): Message => {
                return {
                    id: elt.id,
                    idUser: elt.idUser,
                    idConversation: idconv,
                    message: elt.message
                };
            });

            return response.json({
                status: "ok",
                messages
            });
        });
};

export default getAllMessages;

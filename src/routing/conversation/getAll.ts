import express from "express";

import mysql from "../../repository/mysql";
import { Conversation } from "../../utils/types";

const getAllConversations: express.Handler = (_request, response, _next) => {
    return mysql.query(
        "SELECT id, active, theme FROM conversations",
        (error, results, _fields) => {
            if (error) {
                throw error;
            }

            const conversations: Conversation[] = Array.from(results).map((elt: any): Conversation => {
                return {
                    id: elt.id,
                    active: !!elt.active,
                    theme: elt.theme
                };
            });

            return response.json({
                status: "ok",
                conversations
            });
        });
};

export default getAllConversations;

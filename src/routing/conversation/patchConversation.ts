import express from "express";

import mysql from "../../repository/mysql";
import { Conversation } from "../../utils/types";
import merge from "../../utils/merge";

const patchConversation: express.Handler = (request, response, _next) => {

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

    const requestConversation: Conversation = {
        active: request.body.active,
        theme: request.body.theme
    }

    const id: number = parseInt(request.params.id, 10);

    return mysql.query(
        "SELECT id, active, theme FROM conversations  WHERE id = ?;",
        [
            id
        ],
        (error, results, _fields) => {
            if (error) {
                throw error;
            }

            if (results.length !== 1) {
                return response.status(404).json({
                    status: "Conversation not found"
                });
            }

            const conversation: Conversation = results[0];

            const mergedConversation: Conversation = merge(requestConversation, conversation);

            return mysql.query(
                "UPDATE conversations SET theme = ?, active = ? WHERE id = ?;",
                [
                    mergedConversation.theme,
                    mergedConversation.active,
                    id
                ],
                (error, _results, _fields) => {
                    if (error) {
                        throw error;
                    }
;

                    return response.json({
                        status: "ok",
                    });
                });
        });

};

export default patchConversation;

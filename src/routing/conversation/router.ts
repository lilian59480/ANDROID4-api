import express from "express";

import getAllConversations from "./getAll";
import createConversation from "./createConversation";
import removeConversation from "./removeConversation";
import patchConversation from "./patchConversation";
import getAllMessages from "./message/getAll";
import createMessage from "./message/createMessage";
import removeMessage from "./message/removeMessage";


class Conversation {

    private _router: express.Router;

    constructor() {
        const router = express.Router();

        // Routes used
        router.route("/")
            .get(getAllConversations)
            .post(createConversation);

        router.route("/:id")
            .delete(removeConversation)
            .patch(patchConversation);
        
        router.route("/:idconv/message")
            .get(getAllMessages)
            .post(createMessage);
        
        router.route("/:idconv/message/:id")
            .delete(removeMessage);

        this._router = router;
    }

    public get router(): express.Router {
        return this._router;
    }

}

export default Conversation;

import express from "express";

import getAllUsers from "./getAll";
import patchUser from "./patchUser";
import createUser from "./createUser";
import getUserById from "./getUserById";
import removeUser from "./removeUser";

class User {

    private _router: express.Router;

    constructor() {
        const router = express.Router();

        // Routes used
        router.route("/")
            .get(getAllUsers)
            .post(createUser);

        router.route("/:id")
            .patch(patchUser)
            .get(getUserById)
            .delete(removeUser);


        this._router = router;
    }

    public get router(): express.Router {
        return this._router;
    }

}

export default User;

import express from "express";

import loginRoute from "./login";

class Login {

    private _router: express.Router;

    constructor() {
        const router = express.Router();

        // Routes used
        router.route("/login")
            .post(loginRoute);

        this._router = router;
    }

    public get router(): express.Router {
        return this._router;
    }

}

export default Login;

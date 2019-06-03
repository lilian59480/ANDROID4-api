import express from "express";
import bodyParser from "body-parser";

import middleSetHeaders from "./middleware/setHeaders";
import middleLogRequest from "./middleware/logRequest";
import middleError from "./middleware/error";
import middle404 from "./middleware/404";
import middleAuthJwt from "./middleware/authJwt";

import Login from "./routing/login/router";
import User from "./routing/user/router";
import Conversation from "./routing/conversation/router";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(bodyParser.json());

        this.app.use(middleSetHeaders);
        this.app.use(middleLogRequest);

        // Protected routes
        this.app.use("/user/", middleAuthJwt, new User().router);
        this.app.use("/conversation/", middleAuthJwt, new Conversation().router);

        // Unprotected routes
        this.app.use("/", new Login().router);

        // Error handlers

        this.app.use(middleError);
        this.app.use(middle404);

    }

}

export default App;

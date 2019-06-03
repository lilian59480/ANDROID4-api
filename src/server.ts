import App from "./app";
import mysql from "./repository/mysql";
import { AddressInfo } from "net";

const appClass = new App();
const app = appClass.app;

mysql.connect((err) => {
    if (err) {
        const error = new Error("Error while connecting to MySQL");
        error.stack = err.stack;
        throw error;
    }

    console.log(`Connected as id ${mysql.threadId}`);

    const server = app.listen(8050, () => {

        const address = <AddressInfo>(server.address());
        const host = address.address;
        const port = address.port;

        console.log(`Application listening at http://${host}:${port}`);
    });
});





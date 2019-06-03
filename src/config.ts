import mysql from "mysql";

const tokenSecret: string = "secret";

const databaseOptions: mysql.ConnectionConfig = {
    database: "android",
    user: "ig2i",
    password: "ig2i",
    host: "localhost"
}

export default {
    tokenSecret,
    databaseOptions
};

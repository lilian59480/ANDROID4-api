import mysql from "mysql";

import config from "../config";

// connection configurations
const connection = mysql.createConnection(config.databaseOptions);

export default connection;

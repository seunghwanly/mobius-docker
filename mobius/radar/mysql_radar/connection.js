var mysql = require('mysql');

require('dotenv').config();

// connection
var connectionInfo = {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'grafana',
    port: process.env.DB_PORT
};

module.exports = {
    init: () => mysql.createConnection(connectionInfo),
    connect: (conn) => {
        conn.connect((err) => {
            if(err) console.error(err);
            else console.info('mysql connected !');
        })
    }
}


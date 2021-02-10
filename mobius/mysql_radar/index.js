const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const { parseRadar } = require('./parse');

require('dotenv').config();

const program = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
    });

    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        },
    });

    await instance.start();

    instance.addTrigger({
        name: 'monitoring . . .',
        expression: 'mobiusdb.cin',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (event) => { // You will receive the events here
            // console.log(event);
            // console.log(event.timestamp + '\t' + JSON.stringify(event.affectedRows[0].after.con));
            var timeStamp = event.timestamp;
            var msg = event.affectedRows[0].after.con;
            // console.log(timeStamp, msg);

            var jsonObject = parseRadar(msg.toString());
            // pos
            var pos = {
                x: jsonObject.message.content !== null ? jsonObject.message.content.pos_x : null,
                y: jsonObject.message.content !== null ? jsonObject.message.content.pos_y : null,
                z: jsonObject.message.content !== null ? jsonObject.message.content.pos_z : null
            };
            // bpm
            var bpm = jsonObject.message.content !== null ? jsonObject.message.content.bpm : null;
            // hbr
            var hbr = jsonObject.message.content !== null ? jsonObject.message.content.hbr : null;
            // energy
            var eng = jsonObject.message.content !== null ? jsonObject.message.content.energy : null;

            console.log(timeStamp + ' : ' + JSON.stringify(pos), bpm, hbr, eng);
        },
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
    .then(() => console.log('Waiting for database events...'))
    .catch(console.error);

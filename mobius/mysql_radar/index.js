const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const { parseRadar } = require('./parse');
require('dotenv').config();

// save in grafana
var grafanaConfig = require(__dirname + '/connection.js');
var grafanaConn = grafanaConfig.init();
grafanaConfig.connect(grafanaConn);

// realtime mysql → mobiusdb
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
        onEvent: (event) => {

            // these are for grafana
            var timeStamp = parseInt(event.timestamp);
            var msg = event.affectedRows[0].after.con;


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

            // save to grafana
            // pos
            var sqlPos = 'INSERT INTO pos (pos_x, pos_y, pos_z, time) VALUES (?, ?, ?, ?)';
            /*
                pos x / y / z → 10 cm 단위
                측정된 값이 k 이면, 실제값은 0.1 * k (m)
            */
            var prmPos = [pos.x * 0.1, pos.y * 0.1, pos.z * 0.1, timeStamp];

            // bpm
            var sqlBpm = 'INSERT INTO bpm (val, time) VALUES (?, ?)';
            var prmBpm = [bpm, timeStamp];

            // hbr
            var sqlHbr = 'INSERT INTO hbr (val, time) VALUES (?, ?)';
            var prmHbr = [hbr, timeStamp];

            // energy
            var sqlEng = 'INSERT INTO energy (val, time) VALUES (?, ?)';
            var prmEng = [eng, timeStamp];

            // insert into sql
            if (!isNaN(pos.x) && !isNaN(pos.y) && !isNaN(pos.z)) {
                grafanaConn.query(sqlPos, prmPos, (e) => e ? console.log(e) : console.log('insert_pos'));
            }
            if (!isNaN(bpm)) {
                grafanaConn.query(sqlBpm, prmBpm, (e) => e ? console.log(e) : console.log('insert_bpm'));
            }
            if (!isNaN(hbr)) {
                grafanaConn.query(sqlHbr, prmHbr, (e) => e ? console.log(e) : console.log('insert_hbr'));
            }
            if (!isNaN(eng)) {
                grafanaConn.query(sqlEng, prmEng, (e) => e ? console.log(e) : console.log('insert_eng'));
            }
        },
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
    .then(() => console.log('Waiting for database events...'))
    .catch(console.error);

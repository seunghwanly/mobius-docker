/*
    TAS RADAR
    Author github.com/seunghwanly
*/

// server
var net = require('net');
var ip = require('ip');
const { parseRadarData } = require('./data_parse');

var _server = null;

const tasReady = () => {
    if(_server === null) {
        // create server
        _server = net.createServer((socket) => {
            
            console.log('[ socket connected ]');
            
            // socket id
            socket.id = Math.random() * 1000;

            // socket encoding
            socket.setEncoding('hex');

            // socket를 on data 에 같이 넣어줘서 작업?
            socket.on('data', (data) => tasHandler);
            // end
            socket.on('end', () => console.log('[ socket end ]'));
            // close
            socket.on('close', () => console.log('[ socket closed ]'));
            // error
            socket.on('error', (err) => console.log('**ERROR**\n>> : ' + err));
        })

        _server.listen(3333, () => console.log('TCP SERVER listening on :' + ip.address() + ':3333'));
    }
}

const tasHandler = (data) => {
    parseRadarData(data);
}
// tas ready !!!
tasReady();
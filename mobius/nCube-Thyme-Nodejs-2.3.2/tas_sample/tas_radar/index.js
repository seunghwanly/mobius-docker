/*
    TAS RADAR
    Author github.com/seunghwanly
*/

// server
var net = require('net');
var ip = require('ip');
const port = 3333;
const { parseRadarData } = require('./data_parse');
const { sendThyme } = require('./tas_thyme');

var _server = null;

const tasReady = () => {
    if (_server === null) {
        // create server
        _server = new net.createServer((socket) => {

            console.log('[ socket connected ]');

            // socket encoding
            socket.setEncoding('hex');

            // socket를 on data 에 같이 넣어줘서 작업?
            socket.on('data', (data) => tasHandler(data, socket));
            // end
            socket.on('end', (data) => console.log('[ socket end with data : ' + data + ']'));
            // close
            socket.on('close', (hasErr) => hasErr ? console.error('[ socket closed with error ]') : console.info('[ socket closed ]'));
            // error
            socket.on('error', (err) => console.error('**ERROR**\n>> : ' + err));
        })

        _server.listen(port, () => console.info('TCP SERVER listening on :' + ip.address() + ":" + port.toString()));
    }
}

const tasHandler = (data, socket) => {
    // parseRadarData(data);

    if (data === null) {
        // socket keep alive only for data is null !
        socket.setKeepAlive(true, 5000);
    }
    
    sendThyme(parseRadarData(data));
}
// tas ready !!!
tasReady();
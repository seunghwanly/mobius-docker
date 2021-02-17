/*
    TAS RADAR
    Author github.com/seunghwanly
*/

// server
var net = require('net');
var ip = require('ip');

// using dot env
require('dotenv').config();

var _server = null;

const tasReady = () => {
    if (_server === null) {
        // create server
        _server = new net.createServer((socket) => {
            console.log('[ socket connected ]');

            // socket encoding
            socket.setEncoding('hex');
            // to thyme
            var net = require('net');
            var asClient = net.connect({ port: process.env.ST_PORT });
            // socket를 on data 에 같이 넣어줘서 작업?
            socket.on('data', (data) => tasHandler(data, asClient));
            // end
            socket.on('end', (data) => console.log('[ socket end with data : ' + JSON.stringify(data) + ']'));
            // close
            socket.on('close', (hasErr) => {
                if(hasErr) {
                    console.error('[ socket closed with error ]');
                } else {
                    console.info('[ socket closed ]');
                }
                // destroy socket
                socket.destroy();
            });
            // error
            socket.on('error', (err) => throws('**ERROR**\n>> : ' + err));
        })

        // _server.listen(3333, () => console.info('TCP SERVER listening on :' + ip.address() + ":" + process.env.RS_PORT));
        _server.listen(process.env.RS_PORT, () => console.info('TCP SERVER listening on :' + 'localhost' + ":" + process.env.RS_PORT));
    }
}

const tasHandler = (data, asClient) => {

    if (data === null) {
        // socket keep alive only for data is null !
        asClient.setKeepAlive(true, 5000);
    }
    
    try {
        // send to thyme
        asClient.on('connect', () => {
            // data -> trash
            if (data.toString().substring(0, 4) !== 'ffff') {
                // not working with parsed data ...
                // var send = JSON.stringify(parseRadarData(data)).replace(/"([^"]+)":/g, '$1:');
                // client.write(JSON.stringify(cin).replace(/\\"/g, "'") + '<EOF>');

                var cin = { ctname: 'radar', con: data };

                asClient.write(JSON.stringify(cin) + '<EOF>');
            }
        });
    } catch (error) {
        console.error('3333 -> 3105 : ' + error);
        asClient.on('close', () => asClient.destroy());
    }
    
}
// tas ready !!!
tasReady();
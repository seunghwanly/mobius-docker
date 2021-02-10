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

            // to thyme
            var net = require('net');
            var asClient = net.connect({ port: 3105 });

            // socket encoding
            socket.setEncoding('hex');

            // socket를 on data 에 같이 넣어줘서 작업?
            socket.on('data', (data) => tasHandler(data, asClient));
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

const tasHandler = (data, client) => {
    // parseRadarData(data);

    if (data === null) {
        // socket keep alive only for data is null !
        socket.setKeepAlive(true, 5000);
    }
    // send to thyme
    client.on('connect', () => {
        console.log('3333 -------> 3105');
        // var cin = {ctname: 'radar', con: parseRadarData(data)};

        // data -> trash
        if (data.toString().substring(0, 4) !== 'ffff') {
            var send = JSON.stringify(parseRadarData(data)).replace(/"([^"]+)":/g, '$1:');
                        
            var cin = { ctname: 'radar', con: data };
            // client.write(JSON.stringify(cin).replace(/\\"/g, "'") + '<EOF>');
            
            client.write(JSON.stringify(cin) + '<EOF>');
        }
    });
    client.on('error', (err) => console.error(err));
    client.on('close', () => client.destroy());
}
// tas ready !!!
tasReady();
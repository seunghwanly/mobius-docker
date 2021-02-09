// to thyme
var net = require('net');

exports.sendThyme = (data) => {
    // var toThyme = new net.Socket();
    // toThyme.connect(3105, 'localhost', () => toThyme.write(JSON.stringify(data)));

    // send to thyme
    var _client = net.connect(3105, 'localhost', () => _client.write(JSON.stringify(data)));
}


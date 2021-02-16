const concurrently = require('concurrently');

concurrently([
    { command: 'brew services start mosquitto', name: 'mosquitto' },
    { command: 'cd mobius-2.4.36 && node mobius.js', name: 'mobius' },
    { command: 'cd nCube-Thyme-Nodejs-2.3.2 && node thyme.js', name: 'nCube' },
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3,
});
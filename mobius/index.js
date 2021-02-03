const express = require('express');
const app = express();

app.use(express.static('./mobius-2.4.36'));
app.use(express.static('nCube-Thyme-Nodejs-2.3.2'));
const express = require('express');
const cors = require('cors');
const staticRoutes = require('./routes/static.routes');
const path = require("path");
const history = require('connect-history-api-fallback');

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// app.use(express.static(path.join(__dirname,'static')));

// app.use('/admin', staticRoutes);

const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);

app.listen(8080 , ( ) => {
    console.log('Serv service running on port 8000');
})
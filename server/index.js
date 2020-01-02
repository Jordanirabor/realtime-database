const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes/api');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '',
    key: '',
    secret: '',
    cluster: '',
    encrypted: true
});

const channel = 'inventories'
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api)

mongoose.connect('mongodb://localhost:27010/inventoriesDb?replicaSet=rs0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    app.listen(9000, () => {
        console.log('Running on port 7000');
    });

    const inventoryCollection = db.collection('inventories');
    const changeStream = inventoryCollection.watch();

    changeStream.on('change', (change) => {

    });
});
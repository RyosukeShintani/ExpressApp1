'use strict';
var express = require('express');
const { v4: uuidv4 } = require('uuid');

const client = require('../CosmosClient');

var router = express.Router();

router.get('/', async function (req, res) {
    const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container('LocationLog');

    const response = await container
        .items
        .query("SELECT * from c")
        .fetchAll();

    const locationLog = response.resources;

    res.json(locationLog);
});

router.post('/', async function (req, res) {
const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container('LocationLog');

    const json = {
        id: uuidv4(),
        Partition: 'Common',
        UserId: '1',
        LocationName: 'test',
        Latitude: 35.681236,
        Longitude: 139.767125,
        RegistDate: new Date().toISOString()
    };

    const response = await container
        .items
        .create(json);

        res.status(200).json(response.resource);
});

module.exports = router;

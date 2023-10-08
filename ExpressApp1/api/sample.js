'use strict';
var express = require('express');

const client = require('../CosmosClient');

var router = express.Router();


router.get('/', async function (req, res) {
    const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container('Users');

    const response = await container
        .items
        .query("SELECT * from c")
        .fetchAll();

    const users = response.resources;

    res.json(users);
});

module.exports = router;

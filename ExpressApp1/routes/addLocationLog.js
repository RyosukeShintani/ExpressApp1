'use strict';
var express = require('express');
const client = require('../CosmosClient');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/', async function (req, res) {
    const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container('LocationLog');

    const req_url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${req.body.latitude}&lon=${req.body.longitude}`
    fetch(req_url)
        .then((response)=>response.json())
        .then(async (data)=>{
            console.log(JSON.stringify(data))
            const json = {
                id: uuidv4(),
                Partition: 'Common',
                UserId: req.body.UserId || '0',
                LocationName: data.display_name || '',
                Latitude: req.body.latitude || 0.00,
                Longitude: req.body.longitude || 0.00,
                RegistDate: new Date().toISOString()
            };
            const response = await container.items.create(json)

            res.status(200).json(response.resource)
        })
});

module.exports = router
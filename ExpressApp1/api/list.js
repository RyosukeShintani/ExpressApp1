// const CosmosClient = require('@azure/cosmos').CosmosClient;

// async function getLogs() {
//   const databaseId = 'your-database-id';
//   const containerId = 'your-container-id';

//   const client = new CosmosClient({ endpoint, key });

//   const querySpec = {
//     query: 'SELECT * FROM c WHERE c.type = "log"',
//     parameters: [],
//     options: {
//       maxItemCount: 10, 
//     },
//   };

//   const { resources: logs } = await client
//     .database(databaseId)
//     .container(containerId)
//     .items.query(querySpec)
//     .fetchAll();


//   return logs;
// }
// getLogs().then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error(error);
// });
var express = require('express');
const client = require('../CosmosClient');
var router = express.Router();

router.get('/', async function (req, res) {
    console.log(req.query)
    const limit = req.query.maxItemCount || 1;
    const database = client.database(process.env.COSMOS_DATABASE);
    const container = database.container('LocationLog');

    const response = await container
        .items
        .query(
            `SELECT * from c ORDER BY c.RegistDate DESC OFFSET 0 LIMIT ${limit} `
            )
        .fetchAll();

    const users = response.resources;

    res.json(users);
});

module.exports = router;
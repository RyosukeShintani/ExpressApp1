const { CosmosClient } = require('@azure/cosmos');

require('dotenv').config();
const endpoint = process.env.COSMOS_ENDPOINT; // 環境変数からエンドポイントを取得
const key = process.env.COSMOS_KEY; // 環境変数からキーを取得

var client = new CosmosClient({ endpoint: endpoint, key: key });

module.exports = client;
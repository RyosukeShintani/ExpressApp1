const { CosmosClient } = require('@azure/cosmos');

require('dotenv').config();
const endpoint = process.env.COSMOS_ENDPOINT; // ���ϐ�����G���h�|�C���g���擾
const key = process.env.COSMOS_KEY; // ���ϐ�����L�[���擾

var client = new CosmosClient({ endpoint: endpoint, key: key });

module.exports = client;
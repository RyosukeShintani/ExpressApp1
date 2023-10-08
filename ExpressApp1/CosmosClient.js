const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });

// const endpoint = process.env.COSMOS_ENDPOINT; // ���ϐ�����G���h�|�C���g���擾
// const key = process.env.COSMOS_KEY; // ���ϐ�����L�[���擾

const endpoint = 'https://bigbrother.documents.azure.com:443/'
const key = 'TEa0iSj24m68YiPLnCVYSMKxwMRPpBRFfONcr24zt00wc7Z0VeW6smbXFInwO20VD7USNnSUzF2IACDbJaek2w'

var client = new CosmosClient({ endpoint: endpoint, key: key });

module.exports = client;
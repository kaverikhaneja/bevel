const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("0x6162dd2ee5807a90d370806b58b2b44561bf92f17aa6bfec55c0c46d0c93660e", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

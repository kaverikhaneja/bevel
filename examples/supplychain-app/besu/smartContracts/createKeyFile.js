const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("0x04b1100e5af575e361e30ed0ba77ed6951623f63d09500af550550fad1bba93d", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

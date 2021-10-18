const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com'))

var V3KeyStore = web3.eth.accounts.encrypt("0x92369ecc170c69a425182ffbe75433a5cfe9f09b4d28a863a4066638bd062cd3", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

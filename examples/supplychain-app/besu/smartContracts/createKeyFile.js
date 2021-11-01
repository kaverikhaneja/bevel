const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("0xc6a71d6b26368fae3a34d8a5fb089c44f5bd35a1a84007726fdf8360ab4cf9ee", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("0x88daadf94e6b500c93915d72d2eff1045817d5ebd11107e306e9684f34b634d7", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

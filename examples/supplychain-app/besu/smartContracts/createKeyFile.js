const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com'))

var V3KeyStore = web3.eth.accounts.encrypt("0x7e47e4f67815af5a2c5f8e51407a98a810567563f91322a8b5d261a8df6fe66b", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();
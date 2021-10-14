const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:8590'))

var V3KeyStore = web3.eth.accounts.encrypt("0x8f5fe96c21547263ac39712f9b88cfe06a9a68c54ec12a92035727777bfc48d5", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();
const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("0xe85840b00bc7b98ae2b70f05a021ed1cc194bfecaf6cb24e0c60b32d970b2921", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();
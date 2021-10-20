const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("0xda8c85dccd7495bae88ce066230f9a3df7b1eb14664eae5ab497c53e80882b20", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

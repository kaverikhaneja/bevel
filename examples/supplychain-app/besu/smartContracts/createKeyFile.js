const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:15062'))

var V3KeyStore = web3.eth.accounts.encrypt("1263fe99c7738e5e459de7972c595807825bf5262a87c2f6ebbe5ba877a6a3fe", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

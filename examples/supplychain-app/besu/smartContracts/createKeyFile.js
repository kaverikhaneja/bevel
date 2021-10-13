const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com:8590'))

var V3KeyStore = web3.eth.accounts.encrypt("0x36b36e3f9170d1e4b46d4cd3b82e6789e5e3733f7d67fbb221547c7b8b67a1c3", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();
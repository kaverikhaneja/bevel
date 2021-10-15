const Web3 = require('web3')

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider('http://m-peer1.bes.dev2.aws.blockchaincloudpoc-develop.com'))

var V3KeyStore = web3.eth.accounts.encrypt("0x1d6341d8864cb48435fef0067a487f396cebc64f000f22db085da7dd0db3ddb5", "Password");
console.log(JSON.stringify(V3KeyStore));
process.exit();

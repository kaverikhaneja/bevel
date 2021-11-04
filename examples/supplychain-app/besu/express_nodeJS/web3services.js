var Web3 = require("web3");
const Web3Quorum = require('web3js-quorum');
var {productABI} = require("./ABI/productABI");
var {productContractAddress,quorumServer, ganacheServer, nodeIdentity, nodeOrganization, nodeOrganizationUnit, nodeSubject,protocol} = require("./config");

// Smart contract address
const productAddress = productContractAddress;
console.log(productAddress);

const fromAddress = nodeIdentity;
console.log(fromAddress);

const fromNodeOrganization = nodeOrganization;
console.log(fromNodeOrganization);

const fromNodeOrganizationUnit = nodeOrganizationUnit;
console.log(fromNodeOrganizationUnit);

const fromNodeSubject = nodeSubject;
console.log(fromNodeSubject);
console.log(fromAddress+","+fromNodeSubject);

console.log(protocol);

// const web3 = new Web3(new Web3.providers.HttpProvider(ganacheServer));
const web3quorum = new Web3Quorum(new Web3(ganacheServer));


//instantiate the product smartcontract 
// let productContract = new web3quorum.eth.Contract(productABI, productContractAddress);
// console.log("test");
// console.log(productContract);

module.exports = {
    productContract,
    fromAddress,
    fromNodeOrganization,
    fromNodeOrganizationUnit,
    fromNodeSubject,
    protocol,
    ganacheServer,
    productContractAddress
}


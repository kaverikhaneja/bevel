const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  quorumServer : process.env.QUORUM_SERVER,
  ganacheServer : process.env.GANACHE_SERVER,
  nodeIdentity : process.env.NODE_IDENTITY,
  productContractAddress : process.env.PRODUCT_CONTRACT_ADDRESS,
  nodeOrganization : process.env.NODE_ORGANIZATION,
  nodeOrganizationUnit : process.env.NODE_ORGANIZATION_UNIT,
  nodeSubject : process.env.NODE_SUBJECT,
  protocol: process.env.PROTOCOL,
  privateKey: "1d5f7c049d96563241c90e7974ccb31924377f0395a4de2d2bcfb9e598014d5c",
  privateFrom: "cvsFIg7Nhla2eaooX92MpfizEds/FZZq8Au3qqYaxEk=",
  privateFor: "wpC1bSQYJ/VmF+5owcEK3Bx7G97cH/6cjlW4DIc8ZRU="

};

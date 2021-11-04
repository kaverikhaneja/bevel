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
  privateKey: "2ee0a552f98d59913b9984c25728b529ba705da484bef295ff441c96332e4d15",
  privateFrom: "DS441gvZ2Ek0oTt/qw4zioZsFxZc/hJe/C4VMWQM7Ek=",
  privateFor: "uBjoCEQyezvTqMe8nKiTPwvinJWFsLWBbYFNxA2QrQ8="

};

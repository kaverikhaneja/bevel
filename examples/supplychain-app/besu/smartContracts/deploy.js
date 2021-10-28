// const path = require("path");
const Web3 = require('web3'); // Importing web3.js library
const Web3Quorum = require('web3js-quorum');
const fs = require('fs-extra'); // Importing for writing a file
const contract = require('./compile'); //Importing the function to compile smart contract
const minimist = require('minimist'); // Import the library for the arguments
const Tx = require('ethereumjs-tx').Transaction

let args = minimist(process.argv.slice(2));
const url = args['url'];  // url of RPC port of besu node
const contractPath = args['path']; // path to the contract directory
const contractEntryPoint = args['entryPoint']; // Smart contract entrypoint eg Main.sol
const contractName = args['contractName']; // Smart Contract Class Nameconst initArguments = process.env.INITARGUMENTS | " ";
const chainId = args['chainId'];
const orionPublicKey = args['orionKey'];
const privateKey = args['privateKey'];
const privateFor = [];
const outputFolder = args['output'] == true ? args['output'] : './build';
args['privateFor'].split(',').forEach(item => privateFor.push(item));
const numberOfIterations = args['numberOfIteration'] | 100;

args['v'] && console.log(`Creating a web3 provider.......`);
const web3quorum = new Web3Quorum(new Web3(`${url}`));
const web3 = new Web3(`${url}`)

var transactionHash = ""; // to store transaction hash to get the transaction receipt 
var contractAddress = "";


const deploy = async () => {
  args['v'] && console.log(`Compiling the smartcontract.......`);
  const smartContract = await contract.GetByteCode(numberOfIterations, contractPath, contractEntryPoint, contractName); // Converting smart contract to byte code, optimizing the bytecode conversion for number of Iterations
  args['v'] && console.log(`Smartcontract converted into bytecode and abi`);
  
  const contractOptions = {
    data: `0x${smartContract.bytecode}`, // contract binary
    privateFrom: `${orionPublicKey}`,    // tm address of the sender
    privateFor: privateFor,              // tm addresses of recipients
    privateKey: `${privateKey}`,
  };

  args['v'] && console.log(`Created the contract options`);

  await deploySmartContract(contractOptions);

  // await deploySmartContract(contractOptions)
  //   .then(hash => {
  //     transactionHash = hash;
  //     args['v'] && console.log(`Transaction hash for the deployment is ${hash}`);
  //     web3quorum.priv.waitForTransactionReceipt(transactionHash)
  //       .then(data => {
  //         contractAddress = data.contractAddress
  //         console.log(contractAddress);
  //         args['v'] && console.log(`Transaction receipt:`); //comment for large smartcontracts
  //         args['v'] && console.log(data); //comment for large smartcontracts
  //       });
  //   })
  //   .catch(e => {
  //     console.log("Error")
  //     args['v'] && console.log(`Encountered error:  ${e}`);
  //   }); 

  args['v'] && console.log(`writing the smartcontract binary and abi to build folder......`);
  PostDeployKeeping(smartContract.abi, smartContract.bytecode) // For writing the ABI and the smartContract bytecode in build 

};

const deploySmartContract = async (contractOptions) => {
  args['v'] && console.log(`Deploying the smartcontract......`);
  const txHash = await web3quorum.priv.generateAndSendRawTransaction(contractOptions);
  console.log("Getting contractAddress from txHash: ", txHash);
  const privateTxReceipt = await web3quorum.priv.waitForTransactionReceipt(txHash);
  console.log("Private Transaction Receipt: ", privateTxReceipt);
  return privateTxReceipt // deploy smartcontract with contractoptions

}

const PostDeployKeeping = (abi, bytecode) => {
  try {
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, 0744); // try to create a build folder if not exists
      args['v'] && console.log(`build folder is created`);
    }
  } catch (e) {
    console.log("Error", e)
  }
  try {
    fs.writeFileSync("./build/abi.json", JSON.stringify(abi)) // writing the ABI file
    args['v'] && console.log(`abi is written to abi.json file`);
  } catch (err) {
    console.error(err)
  }
  try {
    fs.writeFileSync("./build/bin.json", JSON.stringify(bytecode)) // writing binary code to the file
    args['v'] && console.log(`bytecode is written to the bin.json file.`);
  } catch (err) {
    console.error(err)
  }
}

deploy() // Calling the deploy function

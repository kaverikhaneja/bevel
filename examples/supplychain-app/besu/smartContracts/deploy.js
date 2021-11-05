// const path = require("path");
const Web3 = require('web3'); // Importing web3.js library
const Web3Quorum = require('web3js-quorum');
const fs = require('fs-extra'); // Importing for writing a file
const contract = require('./compile'); //Importing the function to compile smart contract
const minimist = require('minimist'); // Import the library for the arguments
const Tx = require('ethereumjs-tx').Transaction;

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

var transactionHash = ""; // to store transaction hash to get the transaction receipt 
var contractAddress = "";

const deploy = async () => {
  args['v'] && console.log(`Compiling the smartcontract.......`);
  const smartContract = await contract.GetByteCode(numberOfIterations, contractPath, contractEntryPoint, contractName); // Converting smart contract to byte code, optimizing the bytecode conversion for number of Iterations
  args['v'] && console.log(`Smartcontract converted into bytecode and abi`);
  
  const contractOptions = {
    // from: "0x54b354f4b18b6779df59eee011fa40787f09e53e",
    data: `0x${smartContract.bytecode}`, // contract binary
    privateFrom: `${orionPublicKey}`,    // tm address of the sender
    privateFor: privateFor,              // tm addresses of recipients
    privateKey: `${privateKey}`,
    restriction: `restricted`,
    gas: 427372,
    gasLimit: '0x1fffffffffffff',
    chainId: `${chainId}`,
    chain: "dev"
  };

  args['v'] && console.log(`Created the contract options`);
  
  await deploySmartContract(contractOptions, smartContract.abi, smartContract.bytecode)
    .then(hash => {
      transactionHash = hash;
      args['v'] && console.log(`Transaction hash for the deployment is ${hash}`);
      web3quorum.priv.waitForTransactionReceipt(transactionHash)
        .then(data => {
          contractAddress = data.contractAddress
          args['v'] && console.log(`Transaction receipt:`); //comment for large smartcontracts
          args['v'] && console.log(data); //comment for large smartcontracts
        });
    })
    .catch(e => {
      console.log("Error")
      args['v'] && console.log(`Encountered error:  ${e}`);
    }); 

  args['v'] && console.log(`writing the smartcontract binary and abi to build folder......`);
  PostDeployKeeping(smartContract.abi, smartContract.bytecode) // For writing the ABI and the smartContract bytecode in build 
  
  // let newContainer = {
  //   name: "health"
  // };
  // //calling the addContainer function
  // var result = await addContainer(url, contractAddress, newContainer, smartContract.abi, privateKey, privateFor, privateFor);
  // console.log(result);

};

const deploySmartContract = async (contractOptions) => {
  args['v'] && console.log(`Deploying the smartcontract......`);

  // instantiating smart contract
  // const contract = new web3quorum.eth.Contract(abi, contractAddress);
  // console.log(contract);

  return web3quorum.priv.generateAndSendRawTransaction(contractOptions);
}


// const addContainer = async (url, contractAddress, value, abi, privateKey, privateFrom, privateFor)  => {
//   // const Web3 = require("web3");
//   // const Web3Quorum = require("web3js-quorum");
//   // const web3quorum = new Web3Quorum(new Web3(url));
//   const contract = new web3quorum.eth.Contract(abi, contractAddress);
//   // eslint-disable-next-line no-underscore-dangle
//   const functionAbi = contract._jsonInterface.find(e => {
//     return e.name === "addContainer";
//   });
//   const functionArgs = web3quorum.eth.abi                   //encode and decode parameters to ABI for function calls to the EVM
//     .encodeParameters(functionAbi.inputs, [value])
//     .slice(2);
//   const functionParams = {
//     to: productContractAddress,
//     data: functionAbi.signature + functionArgs,
//     privateKey: privateKey,
//     privateFrom: privateFrom,
//     privateFor: privateFor
//   };
//   const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);
//   console.log(`Transaction hash: ${transactionHash}`);
//   const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
//   return result;
// }

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


// import { config } from 'dotenv';
// import { Web3, Contract } from 'web3';
// import { abi } from '../artifacts/contracts/CoCo.sol/CoCo.json';

// config();

// const cocoAbi = abi;
// const cocoAddress:string = '0xd5F13f0fa049211c71dA34d57118018D20B63A60';
// const privateKey = process.env.PRIVATE_KEY;
// const myAddress:string = '0x567fb5aa82716ae9786eD2e380E2C2629e07D4D9';

// async function interact() {
//     let web3:Web3 = await new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
//     let cocoContract = await new web3.eth.Contract(cocoAbi, cocoAddress);
    
//     let myBalance = await cocoContract.methods.balanceOf(myAddress).call();
//     console.log(myBalance);
// }

// interact();
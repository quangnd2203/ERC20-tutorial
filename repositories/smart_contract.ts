// require('dotenv').config();
// const web3 = require('web3')('https://data-seed-prebsc-1-s1.binance.org:8545');
// const cocoAbi = require('../contracts/coco.json');
// const vaultAbi = require('../contracts/vault.json');

import { Contract, ContractAbi, ContractMethods, Web3, } from 'web3';
import * as fs from 'fs';
import { VAULT_CONTRACT, COCO_CONTRACT } from '../contracts/contracts';

class SmartContractRepo {
    private web3: Web3;

    private withdrawerPrivateKey: string;
    private withdrawerAddress: string;
    private vaultAddress: string;
    private tokenAddress: string;

    constructor() {
        this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
        this.withdrawerPrivateKey = process.env.WITHDRAWER_PRIVATE_KEY as string;
        this.withdrawerAddress = process.env.WITHDRAWER_ADDRESS as string;
        this.tokenAddress = process.env.COCO_ADDRESS as string;
        this.vaultAddress = process.env.VAULT_ADDRESS as string;
    }

    static _instance: SmartContractRepo;

    static async instance(): Promise<SmartContractRepo> {
        if (!this._instance) {
            this._instance = new SmartContractRepo();
        }
        return this._instance;
    }

    async withdraw(address: string, amount: number) {
        this.web3.eth.accounts.wallet.add(this.withdrawerPrivateKey);
        let value = Web3.utils.toWei(amount.toString(), 'wei');
        const vaultContract = new this.web3.eth.Contract(VAULT_CONTRACT, this.vaultAddress);
        let rs = vaultContract.methods.withdraw(value, address).send({
            from: this.withdrawerAddress,
            gas: '3000000',
        });
        return (await rs).transactionHash;
    }
}

export {SmartContractRepo}

import Web3 from 'web3';
import { VAULT_CONTRACT, COCO_CONTRACT } from '../contracts/contracts';
import SmartContractUtils from '../utils/smart_contract_utils';

class SmartContractRepo {
    private web3: Web3;
    private smartContractUtils: SmartContractUtils;

    private withdrawerPrivateKey: string;
    private withdrawerAddress: string;
    private vaultAddress: string;
    private tokenAddress: string;

    constructor() {
        this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
        this.smartContractUtils = new SmartContractUtils(this.web3);
        this.withdrawerPrivateKey = process.env.WITHDRAWER_PRIVATE_KEY as string;
        this.withdrawerAddress = process.env.WITHDRAWER_ADDRESS as string;
        this.tokenAddress = process.env.COCO_ADDRESS as string;
        this.vaultAddress = process.env.VAULT_ADDRESS as string;
    }

    private static _instance: SmartContractRepo;

    static instance(): SmartContractRepo {
        if (!this._instance) {
            this._instance = new SmartContractRepo();
        }
        return this._instance;
    }

    async withdraw(address: string, amount: number) {
        this.web3.eth.accounts.wallet.add(this.withdrawerPrivateKey);
        let value = Web3.utils.toWei(amount.toString(), 'wei');
        const vaultContract = new this.web3.eth.Contract(VAULT_CONTRACT, this.vaultAddress);
        let result = this.smartContractUtils.sendTransaction({
            contract: vaultContract,
            userAddress: this.withdrawerAddress,
            privateKey: this.withdrawerPrivateKey,
            methodName: 'withdraw',
            methodArgs: [value, address],
        })
        return result;
    }
}

export default SmartContractRepo

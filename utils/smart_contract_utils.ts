import Web3, { Transaction, TransactionReceipt, Contract } from "web3";

class SmartContractUtils {
    private web3: Web3;

    constructor(_web3: Web3) {
        this.web3 = _web3;
    }

    generateAccount(random1: string, random2: string) {
        const privateKey = this.web3.utils.keccak256(random1 + random2);
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        const privateKeyV3 = account.privateKey;
        const address = account.address;
        return {
            privateKey: privateKeyV3,
            address: address,
        };
    }

    async sendTransaction({ contract, userAddress, privateKey, methodName, methodArgs }): Promise<TransactionReceipt> {
        const encodedABI = contract.methods[methodName](...methodArgs).encodeABI();
        let txObject: Transaction = {
            from: userAddress,
            to: contract.options.address,
            data: encodedABI,
        };
        const gasLimit = await this.web3.eth.estimateGas(txObject);
        txObject.gas = gasLimit;
        const gasPrice = await this.web3.eth.getGasPrice();
        txObject.gasPrice = gasPrice;
        var result: any;
        try {
            const signedTx = await this.web3.eth.accounts.signTransaction(txObject, privateKey);
            result = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        } catch (e) {
            console.log('Transaction submission failed: ', e);
        }
        return result;
    };
}

export default SmartContractUtils;
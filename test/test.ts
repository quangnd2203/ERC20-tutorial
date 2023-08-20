import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised.default);
import { keccak256 } from 'ethers/src.ts';
import * as utils from './utils';
import { Contract } from 'ethers';
import {Vault, CoCo} from '../typechain-types/contracts';

describe("Vault", function () {
    let owner: SignerWithAddress,
        alice: SignerWithAddress,
        bob: SignerWithAddress,
        carol: SignerWithAddress;

    let vault: Vault,
        token: CoCo;

    this.beforeEach(async () => {
        await ethers.provider.send('hardhat_reset', []);
        [owner, alice, bob, carol] = await ethers.getSigners();

        const _vault = await ethers.getContractFactory('Vault', owner);
        vault = await _vault.deploy();

        const _token = await ethers.getContractFactory('CoCo', owner);
        token = await _token.deploy();

        await vault.setToken(await token.getAddress());
    });

    /// Happy Path
    it('Should deposit into the Vault', async () => {
        let vaultAddess:string = await vault.getAddress();
        let transferAmount:bigint = utils.parseEther(500 * 10 ** 3);
        await token.transfer(alice.address, utils.parseEther(10 ** 6));
        await token.connect(alice).approve(vaultAddess, await token.balanceOf(alice.address));
        await vault.connect(alice).deposit(transferAmount);
        let vaultAmount:bigint = await token.balanceOf(vaultAddess);
        expect(transferAmount == vaultAmount);
    });
})

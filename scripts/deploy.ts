import { ethers, hardhatArguments } from 'hardhat';
import * as config from './config';

async function main() {
  await config.initConfig();
  const network = hardhatArguments.network ?? 'dev';
  const [deployer] = await ethers.getSigners();
  console.log('Deploy from address: %s', deployer.address);

  const _coco = await ethers.getContractFactory('CoCo');
  const coco = await _coco.deploy();
  const cocoAddress = await coco.getAddress();
  console.log('Coco address: %s', cocoAddress);
  config.setConfig(network + '.Coco', cocoAddress);

  const _vault = await ethers.getContractFactory('Vault');
  const vault = await _vault.deploy();
  const vaultAddress = await vault.getAddress();
  console.log('Vault address: %s', vaultAddress);
  config.setConfig(network + '.Vault', vaultAddress);
  await config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
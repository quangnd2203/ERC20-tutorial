import { ethers } from "hardhat";

export function parseEther(amount: Number){
    return ethers.parseUnits(amount.toString(), 18);
}
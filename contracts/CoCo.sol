// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract CoCo is ERC20("CoCo", "COC"), ERC20Burnable, Ownable {
    uint256 private _wei = 10 ** uint256(18);
    uint256 private _maxcap = 20_000_000_000 * _wei;

    constructor() {
        console.log("owner: %s maxcap: %s", msg.sender, _maxcap);
        _mint(msg.sender, _maxcap);
        transferOwnership(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= _maxcap, "ERC20: transfer amount exceeds balance");
        _mint(to, amount);
    }
}
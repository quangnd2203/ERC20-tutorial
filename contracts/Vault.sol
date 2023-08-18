// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract Vault is Ownable, AccessControlEnumerable {
    IERC20 private token;
    uint256 public maxWithdrawAmount;
    bool public isWithdrawEnable;
    bytes32 public constant WITHDRAW_ROLE = keccak256("WITHDRAW_ROLE");

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
    }

    function setMaxWithdrawAmount(uint256 _amount) public onlyOwner {
        maxWithdrawAmount = _amount;
    }

    function setWithdrawEnable(bool _isEnable) public onlyOwner {
        isWithdrawEnable = _isEnable;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function withdraw(uint256 _amount, address to) external onlyWithdrawer {
        require(isWithdrawEnable, "withdraw is not available");
        require(_amount <= maxWithdrawAmount, "Exceed maximum amount");
        token.transfer(to, _amount);
    }

    function deposite(uint256 _amount) external {
        require(
            token.balanceOf(msg.sender) >= _amount,
            "insufficient account balance"
        );
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
    }

    modifier onlyWithdrawer() {
        require(
            owner() == _msgSender() || hasRole(WITHDRAW_ROLE, _msgSender()),
            "Caller is not a withdrawer"
        );
        _;
    }
}

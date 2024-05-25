// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Ifelse {
    function foo(uint _x) public pure returns  (uint256){
        if(_x < 10){
            return 0;
        }else if(_x < 20){
            return 1;
        }else{
            return 2;
        }
    }

    function ternary(uint256 _x) public pure returns (uint256){
        return _x < 10 ? 1:2;
    }
}
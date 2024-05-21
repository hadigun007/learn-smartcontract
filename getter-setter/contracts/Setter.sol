// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Setter {
    string nama = 'hadii';


constructor(string memory name_c){
        nama = name_c;
}

    function setNama(string memory newNama) external {
        nama = newNama;
    }
    
    
    function getNama() external view returns (string memory) {
        return nama;
    }


}
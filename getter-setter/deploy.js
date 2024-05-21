const w = require('web3')
const { abi, bytecode } = require('./artifacts/Setter.json')

async function main(){
    const web3 = new w.Web3('http://localhost:8545')
    const signer = web3.eth.accounts.privateKeyToAccount('0x5833f55264993b66a538cf24b893f51bea944bf3cdfdf3dbba19ea459987c410')

    web3.eth.accounts.wallet.add(signer)

    const contract = new web3.eth.Contract(abi)
    const deployTx = contract.deploy({
        arguments:['hadi initials'],
        data: '0x0' +bytecode
    });
    const deployed = await deployTx.send({
        from: signer.address,
        gas: web3.utils.toHex(10000000)
    }).once('transactionHash', (txhash)=>{
        console.log(`Mining deployment transaction ...`);
        console.log(txhash);
    })
  console.log(`Contract deployed at ${deployed.options.address}`);

}

main()
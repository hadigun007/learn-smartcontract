const {Web3} = require('web3')
const { abi, bytecode } = require('./artifacts/Counter.json')
const { host, private_key } = require('./config')

async function main(){
    const web3 =  new Web3(host)
    const signer = web3.eth.accounts.privateKeyToAccount(private_key)

    web3.eth.accounts.wallet.add(signer)

    const contract = new web3.eth.Contract(abi)
    const deployTx = contract.deploy({
        data: bytecode
    });
    const deployed = await deployTx.send({
        from: signer.address,
        gas: web3.utils.toHex(10000000),
        // gasPrice: web3.utils.toHex(1000000),
    }).once('transactionHash', (txhash)=>{
        console.log(`Mining deployment transaction ...`);
        console.log(txhash);
    })
  console.log(`Contract deployed at ${deployed.options.address}`);

}

main()
const {Web3} = require('web3')
const { abi, bytecode } = require('./artifacts/Counter.json')
const {host, private_key, contract_address} = require('./config')


async function get(){
    const web3 = new Web3(host)
    const signer = web3.eth.accounts.privateKeyToAccount(private_key)

    web3.eth.accounts.wallet.add(signer)

    const contract = new web3.eth.Contract(abi, contract_address)
    const nama = await contract.methods.get().call()
    console.log(nama);
}


async function inc(){
    const web3 = new Web3(host)
    const signer = web3.eth.accounts.privateKeyToAccount(private_key)

    web3.eth.accounts.wallet.add(signer)

    const contract = new web3.eth.Contract(abi, contract_address)
    await contract.methods.inc()
    .send({
        from: signer.address,
        gas: web3.utils.toHex(1000000),
    })
    .on('receipt', (r)=>{
        console.log(r);
    }) 



}
async function dec(){
    const web3 = new Web3(host)
    const signer = web3.eth.accounts.privateKeyToAccount(private_key)

    web3.eth.accounts.wallet.add(signer)

    const contract = new web3.eth.Contract(abi, contract_address)
    await contract.methods.dec()
    .send({
        from: signer.address,
        gas: web3.utils.toHex(1000000),
    })
    .on('receipt', (r)=>{
        console.log(r);
    }) 



}

// inc()
// dec()
get()
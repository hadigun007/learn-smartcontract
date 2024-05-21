const {readFileSync, writeFileSync } = require("fs");
const solc = require("solc");


async function main() {
  const sourceCode = readFileSync("./contracts/Setter.sol", "utf8");
  const { abi, bytecode } = compiles(sourceCode, "Setter");
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  writeFileSync("./artifacts/Setter.json", artifact);
}

function compiles(sourceCode, contractName) {
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main();
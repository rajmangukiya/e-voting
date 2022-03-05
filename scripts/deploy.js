const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  // const nftMarket = await NFTMarket.deploy();
  // await nftMarket.deployed();
  // console.log("nftMarket deployed to:", nftMarket.address);

  // const NFT = await hre.ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy(nftMarket.address);
  // await nft.deployed();
  // console.log("nft deployed to:", nft.address);

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.deployed();
  await voting.addCandidate();
  await voting.addCandidate();
  await voting.addCandidate();
  await voting.addEmails(
    [
      '19ce001@charusat.edu.in',
      '19ce002@charusat.edu.in',
    ],
    2
  )
  console.log("voting deployed to:", voting.address);

  let config = `
  export const votingAddress = "${voting.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.address.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

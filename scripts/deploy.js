async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
  
    const Game2048 = await ethers.getContractFactory("Game2048");
  
    // Deploy the contract
    const game2048 = await Game2048.deploy();
  
    // Wait for the deployment to be confirmed
    await game2048.waitForDeployment();
  
    // Log the deployed contract address
    console.log("Game2048 deployed to:", game2048.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });  
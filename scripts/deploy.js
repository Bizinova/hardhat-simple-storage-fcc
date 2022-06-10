//imports
const { ethers, run, network } = require("hardhat");

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log(`Address deploying the contract --> ${deployer.address}`);
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);
	console.log("Deploying Contract...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();
	console.log(`Deployed contract to: ${simpleStorage.address}`);
	// Only verify when on Rinkeby
	if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(4);
		await verify(simpleStorage.address, []);
	}
	//Interact with contract
	const currentValue = await simpleStorage.retrieve();
	console.log(`Current Value is: ${currentValue}`);
	const txnResponse = await simpleStorage.store(7);
	await txnResponse.wait(1);
	const updateValue = await simpleStorage.retrieve();
	console.log(`Updated Value is: ${updateValue}`);
}

async function verify(contractAddress, args) {
	console.log("Verifying contract...");
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (e) {
		if (e.message.toLowerCase().includes("already verified")) {
			console.log("Already Verified!");
		} else {
			console.log(e);
		}
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

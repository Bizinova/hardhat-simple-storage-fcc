//Testing framework is Mocha
const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

//describe is recognized by Hardhat-Mocha and takes string, and function
describe("SimpleStorage", function () {
	// Define variables
	let simpleStorageFactory, simpleStorage;
	//What to do before each it()
	beforeEach(async function () {
		// Deploy the conract
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("Should start with fav Num of 0", async function () {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";
		//assert
		//expect
		assert.equal(currentValue.toString(), expectedValue);
	});

	it("Should update when we call store", async function () {
		const expectedValue = "7";
		const txnResponse = await simpleStorage.store(expectedValue);
		await txnResponse.wait(1);
		const currentValue = await simpleStorage.retrieve();
		//assert
		//expect
		assert.equal(currentValue.toString(), expectedValue);
		//Alternative syntax
		// expect(currentValue.toString()).to.equal(expectedValue);
	});
});

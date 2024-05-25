import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Mapping", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Mapping = await hre.ethers.getContractFactory("Mapping");
    const mapping = await Mapping.deploy();

    mapping.set('0x152ca30aDe33aA9E044D1070B4105F1d389f9Df3', 1)
    mapping.set('0x71c7656ec7ab88b098defb751b7401b5f6d8976f', 2)

    return { mapping, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set mapping", async function () {
      const { mapping } = await loadFixture(deployOneYearLockFixture);

      expect(await mapping.get('0x152ca30aDe33aA9E044D1070B4105F1d389f9Df3')).to.equal(1);
    });
    it("Should set mapping 2", async function () {
      const { mapping } = await loadFixture(deployOneYearLockFixture);

      expect(await mapping.get('0x71c7656ec7ab88b098defb751b7401b5f6d8976f')).to.equal(2);
    });
  });

});
describe("Nested Mapping", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Mapping = await hre.ethers.getContractFactory("NestedMapping");
    const mapping2 = await Mapping.deploy();

    mapping2.set('0x152ca30aDe33aA9E044D1070B4105F1d389f9Df3', 1, true)
    mapping2.set('0x71c7656ec7ab88b098defb751b7401b5f6d8976f', 2, true)

    return { mapping2, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set nested mapping", async function () {
      const { mapping2 } = await loadFixture(deployOneYearLockFixture);

      expect(await mapping2.get('0x152ca30aDe33aA9E044D1070B4105F1d389f9Df3', 2)).to.equal(false);
    });
    it("Should set nested mapping 2", async function () {
      const { mapping2 } = await loadFixture(deployOneYearLockFixture);

      expect(await mapping2.get('0x71c7656ec7ab88b098defb751b7401b5f6d8976f', 2)).to.equal(false);
    });
  })
});

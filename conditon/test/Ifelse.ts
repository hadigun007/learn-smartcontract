import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Ifelse", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Ifelse = await hre.ethers.getContractFactory("Ifelse");
    const ifelse = await Ifelse.deploy();

    return { ifelse, owner, otherAccount };
  }

  describe("foo", function () {

    it("Should return 0", async function () {
      const { ifelse } = await loadFixture(deployOneYearLockFixture);

      expect(await ifelse.foo(5)).to.equal(0);
    });

    it("Should return 1", async function () {
      const { ifelse } = await loadFixture(deployOneYearLockFixture);

      expect(await ifelse.ternary(5)).to.equal(1);
    });

    it("Should return 2", async function () {
      const { ifelse } = await loadFixture(deployOneYearLockFixture);

      expect(await ifelse.ternary(14)).to.equal(2);
    });
  });
});

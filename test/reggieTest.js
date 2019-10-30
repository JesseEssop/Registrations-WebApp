const assert = require("assert");
const RegCheck = require("../function/ReggieFactory.js");

const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/myreggies';

const pool = new Pool({
    connectionString
});


describe('Registration Numbers test', function () {
    beforeEach(async function () {
        let testInstance = RegCheck(pool);
        await testInstance.resetReg();
    })
    it('This test does not take in a registration number that has special characters', async function () {
        var testInstance = RegCheck(pool);
        await testInstance.add("CA 9798@#$%");
        assert.equal(testInstance.add("CA 9798@#$%"), undefined);
        await testInstance.add("CY !@#$%^9*&^");
        assert.equal(testInstance.add("CY !@#$%^9*&^"), undefined);
        await testInstance.add("CK 3653@#^22");
        assert.equal(testInstance.add("CK 3653@#^22"), undefined);
    })
    it('This test takes in an empty string and returns undefined', async function () {
        var testInstance = RegCheck(pool);
        await testInstance.add(" ");
        assert.equal(testInstance.add("CA"), undefined);
        assert.equal(testInstance.add("CK"), undefined);
        assert.equal(testInstance.add("CY"), undefined);
    })
    it('This test returns an error message when the same registration number is entered ', async function () {
        var testInstance = RegCheck(pool);
        await testInstance.add("CA 364 968");
        await testInstance.add("CA 364 968");
        assert.equal(testInstance.error(), "Registration number already entered");
    })
})
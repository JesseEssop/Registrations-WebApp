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

        await pool.query('insert into reg_location (town) values ($1)', ['Cape Town']);
        await pool.query('insert into reg_location (town) values ($1)', ['Bellville']);
        await pool.query('insert into reg_location (town) values ($1)', ['Malmesbury']);
    })
    it('This test takes in a registration number that has special characters and returns an error', async function () {
        var testInstance = RegCheck(pool);
        await testInstance.add("CA 9798@#$%");
        assert.equal(testInstance.error(), "INVALID REGISTRATION");
        await testInstance.add("CY !@#$%^9*&^");
        assert.equal(testInstance.error(), "INVALID REGISTRATION");
        await testInstance.add("CK 3653@#^22");
        assert.equal(testInstance.error(), "INVALID REGISTRATION");
    })
    it('This test takes in an empty string and returns an error messsage', async function () {
        var testInstance = RegCheck(pool);
        await testInstance.add(" ");
        assert.equal(await testInstance.error(), "INVALID REGISTRATION");
        assert.equal(await testInstance.error(), "INVALID REGISTRATION");
        assert.equal(await testInstance.error(), "INVALID REGISTRATION");
    })
    it('This test returns an error message when the same registration number is entered ', async function () {
        var testInstance = RegCheck(pool);
        await testInstance.add("CA 364 968");
        await testInstance.add("CA 364 968");
        assert.equal(testInstance.error(), "REGISTRATION ALREADY EXISTS");
    })
})
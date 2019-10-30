module.exports = function RegCheck(pool) {
    // console.log(pool)
    var regString = {};
    var regex = /^[A-Za-z]{2}\s[-0-9\s]{3}\s[0-9]{3}$/;
    var newReggie;
    var car;
    var allCars;
   
    var error


    async function addNewReg(oldReg) {

        if (testReg(oldReg)) {
            car = await pool.query('SELECT * FROM Reg_plates WHERE regNumber = $1', [newReggie])

            if (newReggie.startsWith('CA')) {
                await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 1]);

                
            }
            if (newReggie.startsWith('CY')) {
                await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 2]);
                
            }
            if (newReggie.startsWith('CK')) {
                await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 3])
                
            }
            if(oldReg === newReggie){
                error = "REGISTRATION ALREADY EXISTS"
            }
        }
        else{
            return "INVALID REGISTRATION"
        }
    }

    async function allReggies() {
        allCars = await pool.query('select * from Reg_plates');
        // console.log(allCars.rows)
        return allCars.rows
    }

    function testReg(reggie) {
        // console.log(reggie);
        var wack = regex.test(reggie);
        if (wack === true) {
            newReggie = reggie.toUpperCase();
            return newReggie
        }
        else {
            newReggie = null
        }
        return newReggie
    }



    async function resetReg() {
        await pool.query('delete from Reg_plates');
    }

    function error(){
        return error
    }

    return {
        add: addNewReg,
        testReg,
        allReggies,
        resetReg,
        error
        // RegFilter
    }
}

module.exports = function RegCheck(pool) {
    // console.log(pool)
    var regString = {};
    var regex = /^[A-Za-z]{2}\s[-0-9\s]{3}\s[0-9]{3}$/;
    var newReggie;
    var car;
    var allCars;
    var capeCars;
    var bellvilleCars;
    var malmesburyCars;

    async function addNewReg(oldReg) {

        if (testReg(oldReg)) {
            car = await pool.query('SELECT * FROM Reg_plates WHERE regNumber = $1', [newReggie])

            if (newReggie.startsWith('CA')) {
                await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 1]);
               
                // console.log(capeCars.rows)
            }
            if (newReggie.startsWith('CY')) {
                await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 2]);
                bellvilleCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 2;')
                console.log(bellvilleCars.rows)
            }
            if (newReggie.startsWith('CK')) {
                await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 3])
                malmesburyCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 3;')
                console.log(malmesburyCars.rows);
            }
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


    return {
        add: addNewReg,
        testReg,
        allReggies,
        resetReg,
        // RegFilter
    }
}

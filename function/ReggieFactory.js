module.exports = function RegCheck(pool) {
    // console.log(pool)
    var regFilter = [];
    var regex = /^[A-Za-z]{2}\s[-0-9\s]{3}\s[0-9]{3}$/;
    var newReggie;
    var car;
    var allCars;
    var capeCars;
    var villeCars;
    var buryCars
    var error
    var everything;


    async function addNewReg(oldReg) {

        // console.log(oldReg)

        if (testReg(oldReg)) {
            car = await pool.query('SELECT * FROM Reg_plates WHERE regNumber = $1', [newReggie]);
            console.log(car.rows);
            if (car.rows.length === 0) {

                if (newReggie.startsWith('CA')) {
                    await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 1]);
                    capeCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 1')

                }
                if (newReggie.startsWith('CY')) {
                    await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 2]);
                    villeCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 2')
                }
                if (newReggie.startsWith('CK')) {
                    await pool.query('insert into Reg_plates (regNumber, reg_id) values ($1, $2)', [newReggie, 3])
                    buryCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 3')
                }
            } 
            else {
                error = "REGISTRATION ALREADY EXISTS"
            }

        } else {
            error = "INVALID REGISTRATION"
        }
    }


    async function allReggies() {
        allCars = await pool.query('select * from Reg_plates');
        regFilter = allCars.rows
    }

    function testReg(reggie) {

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

    function carFilter() {
        return regFilter;
    };

    async function CAcars() {
        capeCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 1')
        regFilter = capeCars.rows;
    }

    async function CYcars() {
        villeCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 2')
        regFilter = villeCars.rows;
    }

    async function CKcars() {
        buryCars = await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 3')
        regFilter = buryCars.rows;
    }

    async function resetReg() {
        await pool.query('delete from Reg_plates');
    }

    function error() {
        return error
    }

    return {
        add: addNewReg,
        testReg,
        allReggies,
        resetReg,
        error,
        CAcars,
        CYcars,
        CKcars,
        carFilter

    }
}

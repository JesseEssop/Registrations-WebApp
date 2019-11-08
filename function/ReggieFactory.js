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
        error = '';
        if (testReg(oldReg)) {
            car = await pool.query('SELECT * FROM reg_plates WHERE regnumber = $1', [newReggie]);

            if (car.rows.length === 0) {

                if (newReggie.startsWith('CA')) {
                    await pool.query('insert into reg_plates (regnumber, reg_id) values ($1, $2)', [newReggie, 1]);
                    capeCars = await pool.query('SELECT reg_location.town, reg_plates.regnumber FROM reg_location INNER JOIN reg_plates ON reg_location.id = reg_plates.reg_id WHERE reg_location.id = 1')

                }
                else if (newReggie.startsWith('CY')) {
                    await pool.query('insert into reg_plates (regnumber, reg_id) values ($1, $2)', [newReggie, 2]);
                    villeCars = await pool.query('SELECT reg_location.town, reg_plates.regnumber FROM reg_location INNER JOIN reg_plates ON reg_location.id = reg_plates.reg_id WHERE reg_location.id = 2')

                }
                else if (newReggie.startsWith('CK')) {
                    await pool.query('insert into reg_plates (regnumber, reg_id) values ($1, $2)', [newReggie, 3])
                    buryCars = await pool.query('SELECT reg_location.town, reg_plates.regnumber FROM reg_location INNER JOIN reg_plates ON reg_location.id = reg_plates.reg_id WHERE reg_location.id = 3')

                }
                else {
                    error = "INVALID LOCATION"
                }
            }
            else {
                error = "REGISTRATION ALREADY EXISTS"
            }

        } else {
            error = "INVALID REGISTRATION"
        }
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

    async function everyCar(place) {

        if (place === "") {
            allCars = await pool.query('select * from reg_plates');
            regFilter = allCars.rows
        }
        if (place === "CA") {
            regFilter = capeCars.rows;
        }
        if (place === "CY") {
            regFilter = villeCars.rows;
        }
        if (place === "CK"){
            regFilter = buryCars.rows;
        }
    }

    async function resetReg() {
        regFilter = []
        await pool.query('delete from reg_plates');
        return regFilter;
    }

    function error() {
        return error
    }

    return {
        add: addNewReg,
        testReg,
        resetReg,
        error,
        carFilter,
        everyCar

    }
}

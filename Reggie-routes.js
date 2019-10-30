const Registration = require("./function/ReggieFactory");

module.exports = function ReggieRoutes(pool) {
    const reggie = Registration(pool);

    async function indexRoute(req, res) {
        res.render('index', {
            regNums: await reggie.allReggies()
        });
    }

    async function settingsRoute(req, res) {
        var cars = req.body.regnum
        var testcar = await reggie.testReg(cars);

        if (req.body.reset === 'reset') {
            await reggie.resetReg();
        }
        else {
            if (cars.startsWith('CA') || cars.startsWith('CY') || cars.startsWith('CK')) {
                await reggie.add(cars);
            }
            else {
                req.flash('error', 'INVALID LOCATION')
            }
            if (testcar === false || cars.length < 0 || testcar === null) {
                req.flash('error', 'INVALID REGISTRATION')
            }
        }
        res.redirect('/');
    }

    // async function regFilter(res, req) {

    //     var filter = req.body.regType

    //     await pool.query('SELECT * FROM Reg_plates WHERE regNumber = $1', [newReggie])

    //     if (filter === "CA") {
    //         await pool.query('SELECT Reg_location.town, Reg_plates.regnumber FROM Reg_location INNER JOIN Reg_plates ON Reg_location.id = Reg_plates.reg_id WHERE Reg_location.id = 1;')
            
    //     }

    //     if (filter === "CY") {
           
    //     }

    //     if (filter === "CK") {
    //         return malmesburyCars.rows
    //     }

    //     res.redirect('/')
    // }


    return {
        indexRoute,
        settingsRoute,
        // regFilter
    }
}
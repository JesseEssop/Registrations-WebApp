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


    return {
        indexRoute,
        settingsRoute,
    }
}
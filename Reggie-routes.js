const Registration = require("./function/ReggieFactory");

module.exports = function ReggieRoutes(pool) {
    const reggie = Registration(pool);

    async function indexRoute(req, res) {
        res.render('index', {
            regNums: await reggie.carFilter()
        });
    }

    async function settingsRoute(req, res) {
        var cars = req.body.regnum.toUpperCase()
        var testcar = await reggie.testReg(cars);

        if (req.body.reset === 'reset') {
            await reggie.resetReg();
            req.flash('error2', 'DATABASE HAS BEEN RESETED')
            
        }
        else {

            await reggie.add(cars);
            
            if (reggie.error()) {
                req.flash('error', reggie.error())
            }

            else if(cars.startsWith('CA') ||cars.startsWith('CY') ||cars.startsWith('CK') || cars.startsWith('ca') || cars.startsWith('cy') || cars.startsWith('ck')){
                req.flash('error2',"REGISTRATION SUCCESSFULLY ADDED !")
            }

            
        }
        res.redirect('/');
    }

    async function filterRoute(req, res) {
        var town = req.body.townDropDown

        await reggie.everyCar(town)

        res.redirect('/')
    }


    return {
        indexRoute,
        settingsRoute,
        filterRoute
    }
}
const { Router } = require('express');
const router = Router();
const { Temperament } = require('../db');
const { getApiInfo } = require('../controllers/controllers.js');


router.get('/', async (req, res) => {
    const temperamentsApi = await getApiInfo();
    const temperaments = temperamentsApi.map(e => e.temperaments);
    /*temperamentsApi.data.map(el => {
        let temp = el.temperament;
        (typeof(temp) == "string") ?
            temp = temp.split(", ") :
            temp = [];
        return temp;
    });*/
    let tempEach = temperaments.flatMap(e => e).join().split(',');
    //console.log(tempEach);
    tempEach = tempEach.map(e => e.trim());
    tempEach.forEach(el => {
        if (el) {
            Temperament.findOrCreate({
                where: {name: el}
            });
        }
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
});

module.exports = router;
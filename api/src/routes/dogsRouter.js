//import { getAllDogs } from '../controllers/controllers.js';
const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../controllers/controllers.js');



router.get('/', async (req, res) => {
    try {
        const name = req.query.name;
        let totalDogs = await getAllDogs();
        if (name) {
            let dogName = await totalDogs.filter( el => el.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send(`ERROR: 
            Dog not found.`);
        } else {
            res.status(200).send(totalDogs);
        }  
    } catch (err) {
        res.status(404).send({msg: `ERROR: 
        Database connection failed.`});
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        life_span,
        image,
        temperaments
    } = req.body;
    const dogExist = await Dog.findAll({where: { name }});
    if (!(dogExist.length)) { 
        const dogCreated = await Dog.create({
            name: name,
            height: `${minHeight} - ${maxHeight}`,
            weight: `${minWeight} - ${maxWeight}`,
            life_span: life_span,
            image: image,
            createdInDB: true
        });
        //const myTemps = Array.isArray(temperaments) ? temperaments : temperaments.split(', ');
        console.log('temperament: '+temperaments);
        console.log('==============================================================');
        temperaments.forEach(async e => {
                const tempsDB = await Temperament.findAll({
                where: {name : e}
            });
            console.log(tempsDB);
            await dogCreated.addTemperament(tempsDB[0]);
        });
        res.send("personaje creado con exitos"+ dogCreated.temperaments);
    }
    else{
        res.status(400).send(`ERROR: 
        Dog name exists.`) 
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const totalDogs = await getAllDogs();
        if (id) {
            let dogId = await totalDogs.filter( el => el.id == id);
            dogId.length ?
            res.status(200).json(dogId) :
            res.status(404).send('dog not found');
        }
    } catch (err) {
        res.status(404).send({msg: `ERROR: 
        Database connection failed.`});
    }
});

module.exports = router;

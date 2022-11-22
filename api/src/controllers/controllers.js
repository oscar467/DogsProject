const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');



const getApiInfo = async () => {
    const apiUrl = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        /*let temp = el.temperament;
        (typeof(temp) == "string") ?
            temp = temp.split(", ") :
            temp = [];*/
        return {
        id: el.id,
        name: el.name, 
        height: el.height.metric,
        weight: el.weight.metric,
        life_span: el.life_span,
        temperaments: el.temperament,
        image: el.image.url,
        };
    });
    return apiInfo;
};


const getDBInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: [`name`],
            through: {
                attributes: [],
            },
        },
    })
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};

module.exports = { 
    getApiInfo,
    getDBInfo,
    getAllDogs
}
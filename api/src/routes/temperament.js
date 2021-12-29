const { Router, response } = require('express');
const router = Router();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

router.get('/', async (req,res,next)=>{
    const {data} = await axios.get('https://api.thedogapi.com/v1/breeds')
    
    const mapTemperament = data.map((e)=>{
        return e.temperament
    })
    const mapSplit =  mapTemperament.map((e)=>{
        return e && e.split(', ')
    })
    const order = mapSplit.flat().sort()

    const dataArray = new Set(order)

    let result = [...dataArray]
    const temp = result.map((c) => {
		return {
			name: c || 'Could not get name',
		};
	});

    const temperamentDB = await Temperament.bulkCreate(temp); 
	
	res.send(temperamentDB);
 })

module.exports = router;
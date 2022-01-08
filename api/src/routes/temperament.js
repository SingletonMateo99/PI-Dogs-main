const { Router, response } = require('express');
const router = Router();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

router.get('/', async (req,res,next)=>{
	const temps = await Temperament.findAll();
	if(temps.length === 0){
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds`);

	const allBreed = data.map((b) => { // mapeo todas las razas y me devuelve los temperamentos
		return b.temperament;
	});

	const allJoin = allBreed.map((e) => {  // mapeo todos los temperamentos y me los separa por el split con una coma
		return e && e.split(', ');
	});

	const order = allJoin.flat().sort(); //flat concatena todos los arreglos en uno solo , metodo de ordemiento 

	const dataArray = new Set(order); // 
	let result = [...dataArray];

	const temp = result.map((c) => {
		return {
			name: c || 'Could not get name',
		};
	});

	const temperamentDB = await Temperament.bulkCreate(temp); // creo en la base de datos
	// console.log(temperamentDB);
	res.send(temperamentDB);}
	else{
		res.send(temps)
	}
	
 })

module.exports = router;
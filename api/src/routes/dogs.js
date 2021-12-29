const { Router, response } = require('express');
const router = Router();
const {v4: uuidv4} = require('uuid');
const axios = require('axios');

const { Dog, Temperament } = require('../db.js');


router.post('/', async (req,res,next)=>{
    const { name,weight, height, life_span, temperament} = req.body;
    try{
        
        const newDog = await Dog.create({
            id:uuidv4(),
            name: name,
			weight: weight, 
			height: height, 
			life_span: life_span,
            image: 'https://bit.ly/36J26Nu',
			db: true
        })
        await newDog.addTemperament(temperament)
        if(newDog){
            return res.json({message: 'Dog created sucessfully',
				data: newDog}); 
        }

    }
    catch (error) {
        next(error);}

})

router.get('/', async (req,res,next)=>{
    const name = req.query.name 
    if (name){
        const query = name.toLowerCase()
        
        const dbSearch = Dog.findAll({
            where:{
                name: query,
            }, 
            include:{
                model: Temperament,
            },
        })

        const api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${query}`)
        
        const search= api.data.map(async (e)=>{
        return{
            id: e.id || 'id not found',
            name: e.name || 'name not found',
            weight: e.weight.metric || 'Weight not found',
            height: e.height.metric || 'Height not found',
            life_span: e.life_span || 'Life span not found',
            image:
					'https://cdn2.thedogapi.com/images/' + e.reference_image_id + '.jpg' ||
					'https://bitsofco.de/content/images/2018/12/broken-1.png',
			temperament: e.temperament || 'Temperament  not found',
        }})

        const apiSearch= await Promise.all(search)
        Promise.all([dbSearch, apiSearch]).then((results) => {
			const [dbMineResult, apiBreedResult] = results;
			const response = dbMineResult.concat(apiBreedResult);
			res.send(response);
        })
    }
    else {
        try {
            const dbSearch = Dog.findAll({
                include:{
                    model: Temperament,
                },
            })
            const api = await axios.get("https://api.thedogapi.com/v1/breeds")
            const search= api.data.map(async (e)=>{
                return{
                    id: e.id || 'Id not found',
					name: e.name || 'Name not found',
					image:
						e.image.url ||
						'https://bitsofco.de/content/images/2018/12/broken-1.png',
					temperament: e.temperament || 'Temperament not found',
					weight: e.weight.metric || 'Weight not found',
					height: e.height.metric || 'Height not found',
					life_span: e.life_span || 'Life span not found',
                }})
                const apiSearch = await Promise.all(search)
                
                Promise.all([dbSearch, apiSearch]).then((results) => {
                    const [dbMineResult, apiBreedResult] = results;
                    const response = dbMineResult.concat(apiBreedResult);
                    res.send(response);
                })

        } catch(error){
            next(error)
        }
    }
    

})

router.get('/:id', async (req,res,next)=>{
    const {id} = req.params
    try{
    if(id.length > 6){
        const dbSearch =  await Dog.findByPk(id,{
            include:{
                model:Temperament
            }
        } )
        res.json(dbSearch)
    }

    else{
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
        const breed = {
            id: data.id,
            name: data.name,
            image: 'https://cdn2.thedogapi.com/images/' + data.reference_image_id + '.jpg',
            weight: data.weight.metric,
            height: data.height.metric,
            life_span: data.life_span,
            temperament:data.temperament,}        

            res.json(breed)
    }
    }catch(error){
        next(error)
    }


})
module.exports = router;
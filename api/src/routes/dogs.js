const { Router, response } = require('express');
const router = Router();
const {v4: uuidv4} = require('uuid');

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

module.exports = router;
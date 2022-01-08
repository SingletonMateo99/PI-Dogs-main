const { Router, response } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');


router.post('/', async (req, res, next) => {
    //DESTRUCTURING DEL BODY 
    const { name, weight, height, life_span, temperament } = req.body;
    try {
        //CREO UNA RAZA EN LA TABLA DOGS Y LA GUARDO EN NEWDOG
        const newDog = await Dog.create({
            id: uuidv4(),
            name,
            weight,
            height,
            life_span,
            image: 'https://64.media.tumblr.com/b7a477ae74d92fe8ec6530323ac523d3/tumblr_nhze75IASK1tszwcio1_500.png',
            db: true
        })
        //LE AGREGO EL TEMPERAMENTO EN LA TABLA INTERMEDIA 
        await newDog.addTemperament(temperament)

        //SI SE CREO CORRECTAMENTE SE RETORNA LA NUEVA RAZA 
        if (newDog) {
            return res.json({
                message: 'Dog created sucessfully',
                data: newDog
            });
        }

    }
    catch (error) {
        next(error);
    }

})

router.get('/', async (req, res, next) => {
    
    const name = req.query.name
    //SI PASAN UN NOMBRE POR EL QUERY LOS BUSCA EN LA BASE DE DATOS 
    if (name) {
        const query = name.toLowerCase()

        const dbSearch = Dog.findAll({
            where: {
                name: query,
            },
            include: {
                model: Temperament,
            },
        })
        //BUSCAMOS EL NAME EN LA API TAMBIEN
        const api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${query}`)

        
        const search = api.data.map(async (e) => {
            return {
                id: e.id || 'id not found',
                name: e.name || 'name not found',
                weight: e.weight.metric || 'Weight not found',
                height: e.height.metric || 'Height not found',
                life_span: e.life_span || 'Life span not found',
                image:
                    'https://cdn2.thedogapi.com/images/' + e.reference_image_id + '.jpg' ||
                    'https://bitsofco.de/content/images/2018/12/broken-1.png',
                temperament: e.temperament || 'Temperament  not found',
            }
        })
        
        //USO EL PROMISE.ALL PARA RESOLVER LAS PROMESAS DE LA BUSQUEDA POR API Y DB Y LOS GUARDO EN RESPONSE
        const apiSearch = await Promise.all(search)
        Promise.all([dbSearch, apiSearch]).then((results) => {
            const [dbMineResult, apiBreedResult] = results;
            const response = dbMineResult.concat(apiBreedResult);
            res.send(response);
        })
    }
    else {
        try {
            //BUSCO  TODAS LAS RAZAS EN LA DB 
            const dbSearch = Dog.findAll({
                include: {
                    model: Temperament,
                },
            })

            //BUSCO TODAS LAS RAZAS EN LA API
            const api = await axios.get("https://api.thedogapi.com/v1/breeds")

            const search = api.data.map(async (e) => {
                return {
                    id: e.id || 'Id not found',
                    name: e.name || 'Name not found',
                    image:
                        e.image.url ||
                        'https://bitsofco.de/content/images/2018/12/broken-1.png',
                    temperament: e.temperament || 'Temperament not found',
                    weight: e.weight.metric || 'Weight not found',
                    height: e.height.metric || 'Height not found',
                    life_span: e.life_span || 'Life span not found',
                }
            })
            //RESUELVO TODAS LAS PROMESAS DE LA BUSQUEDA DE LA API 
            const apiSearch = await Promise.all(search)

            //USO EL PROMISE.ALL PARA RESOLVER LAS PROMESAS DE LA BUSQUEDA POR API Y DB Y LOS GUARDO EN RESPONSE
            Promise.all([dbSearch, apiSearch]).then((results) => {
                const [dbMineResult, apiBreedResult] = results;
                const response = dbMineResult.concat(apiBreedResult);
                res.send(response);
            })

        } catch {
            return res.status(400).send('Breed not found');
        }
    }


})

router.get('/:id', async (req, res, next) => {
    //RECIBO LA ID POR PARAMS
    const { id } = req.params
    try {
        //SI LA ID TIENE MAS DE 6 DIGITOS LA BUSCO POR LA DB, YA QUE UTILIZA UUID
        if (id.length > 6) {
            const dbSearch = await Dog.findByPk(id, {
                include: {
                    model: Temperament
                }
            })
            res.json(dbSearch)
        }

        else {
            //SI TIENE MENOS DE 6 DIGITOS LA BUSCO EN LA API, YA QUE NUNCA SOBREPASA LOS 3 DIGITOS
            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
            const breed = {
                id: data.id,
                name: data.name,
                image: 'https://cdn2.thedogapi.com/images/' + data.reference_image_id + '.jpg',
                weight: data.weight.metric,
                height: data.height.metric,
                life_span: data.life_span,
                temperament: data.temperament,
            }

            res.json(breed)
        }
    } catch (error) {
        next(error)
    }


})
module.exports = router;


//`${weightMin.trim()} - ${weightMax.trim()}`
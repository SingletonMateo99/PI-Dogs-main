const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogs.js");
const temperamentRouter = require("./temperament.js");

router.use("/dogs", dogsRouter);
router.use("/temperament", temperamentRouter);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

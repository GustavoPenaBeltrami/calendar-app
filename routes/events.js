const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post('/', [
    check('title', 'titulo obligatorio').not().isEmpty(),
    check('start', 'fecha inicio obligatoria').custom(isDate),
    validarCampos

], crearEvento);


//Actualizar evento
router.put('/:id', [
    check('title', 'titulo obligatorio').not().isEmpty(),
    check('start', 'fecha inicio obligatoria').custom(isDate),
    validarCampos

], actualizarEvento);


//Borrar evento
router.delete('/:id', borrarEvento);


module.exports = router
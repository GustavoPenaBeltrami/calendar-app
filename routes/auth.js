// Rutas del usuario / Auth
// host + /api/auth
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const { validarJWT } = require('../middleware/validar-jwt.js');
const { createUser, login, renew } = require('../controllers/auth.js')

const router = Router();

router.post(
    '/new',
    [
        //middelware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    createUser
)

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    login)

router.get('/renew', validarJWT, renew)

module.exports = router
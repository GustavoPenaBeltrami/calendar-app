const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = async(uid, name) => {

    let tokenGenerado

    await new Promise( (resolve, reject) => {
        const payload = {uid, name};


        jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn: '2h'}, (err, token) => {
            if (err){
                console.log(err);
                reject('No se pud generar el token');
            }
            resolve(token);
        });
    }).then( (token) => {
        tokenGenerado = token
    });
    return tokenGenerado
};

module.exports = {
    generarJWT
}
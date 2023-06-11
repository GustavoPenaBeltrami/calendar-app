const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


// Crear el servidor de express
const app = express();


//Base de Datos
dbConnection()


//CORS
app.use(cors())


//Directorio publico
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json());


//Auth: Register, login & renew token
app.use( '/api/auth', require('./routes/auth') );
// CRUD: Eventos
app.use( '/api/events', require('./routes/events') );
//Para el front
app.use( '*', (req, res) => {
 res.sendFile(__dirname + '/public/index.html')
});

// Escuchar peticiones
app.listen( process.env.PORT, () =>{
    console.log(`Servidor Corriendo en puerto ${process.env.PORT}`)
} )

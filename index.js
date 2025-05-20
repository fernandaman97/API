const express = require('express'); //crea el servidor y las rutas
const app = express(); // instancia principal de configuración
const mongoose = require('mongoose'); // conecta node con mongo
const cors = require('cors'); // permite peticiones desde diferentes dominios
const morgan = require('morgan'); // muestra losg de las peticiones en la consola
const bodyParser = require('body-parser'); // permite la lectura de los json

// Middlewares globales 
app.use(cors()); //permite el acceso desde postman
app.use(morgan('dev')); // imprime logs en la consola
app.use(bodyParser.json()); //convierte del formato json a req.body

// Rutas
const clientRoute = require('./routes/client'); 
app.use('/servicios', clientRoute);

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://Cluster0:0nXxBBanGlPnSzla@cluster1.sfuh05w.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conectado a MongoDB Atlas exitosamente');
});

// Servidor
app.listen(10000, () => {
  console.log('Servidor corriendo en http://localhost:10000');
});

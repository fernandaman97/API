const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

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

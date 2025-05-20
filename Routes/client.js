// routes/post.js
const express = require('express'); //importamos express
const router = express.Router(); //creamos el objeto router para definir las rutas específicas
const Client = require('../models/Client'); //importamos el modelo client que representa la coleccion en la base de datos.

// GET consulta todos los documentos, si hay exito trae la lista, si no, muestra el error 500
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET buscar un solo cliente por id
router.get('/:clientId', async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//POST crear registro de un nuevo cliente
router.post('/', async (req, res) => {
    const client = new Client({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    });
  
    try {
      const savedClient = await client.save();
      res.status(201).json(savedClient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PATCH - Actualizar cliente por ID
router.patch('/:clientId', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.clientId.trim(), // por si tiene espacios
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone
        }
      },
      { new: true } // devuelve la actualizacioón
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete borrar un registro de un cliente
  router.delete('/:clientId', async (req, res) => {
    try {
      const removedClient = await Client.findByIdAndDelete(req.params.clientId); //  corregido
  
      if (!removedClient) {
        return res.status(404).json({ message: 'Registro de cliente no encontrado' });
      }
  
      res.json({ message: 'Registro de cliente eliminado correctamente' }); // agregado
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router; //lo exportamos para poderlo importar donde lo necesitemos, por ejemplo en el index.js

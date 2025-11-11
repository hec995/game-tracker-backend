const express = require('express');
const router = express.Router();
const {
  crearJuego,
  obtenerJuegos,
  obtenerJuegoPorId,
  actualizarJuego,
  eliminarJuego,
} = require('../controllers/gamesController');

// Rutas CRUD
router.post('/', crearJuego);              // Crear juego
router.get('/', obtenerJuegos);            // Listar todos
router.get('/:id', obtenerJuegoPorId);     // Obtener por ID
router.put('/:id', actualizarJuego);       // Actualizar
router.delete('/:id', eliminarJuego);      // Eliminar

module.exports = router;

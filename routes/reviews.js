const express = require('express');
const router = express.Router();
const {
  crearReseña,
  obtenerReseñas,
  obtenerReseñaPorId,
  actualizarReseña,
  eliminarReseña,
} = require('../controllers/reviewsController');

// Rutas CRUD
router.post('/', crearReseña);            // Crear reseña
router.get('/', obtenerReseñas);          // Listar todas o filtrar por juego
router.get('/:id', obtenerReseñaPorId);   // Obtener una reseña
router.put('/:id', actualizarReseña);     // Actualizar reseña
router.delete('/:id', eliminarReseña);    // Eliminar reseña

module.exports = router;

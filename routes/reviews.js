const express = require('express'); 
const router = express.Router();
const protegerRuta = require('../middlewares/authMiddleware');
const { 
  crearReseña, 
  obtenerReseñasPorJuego,
  actualizarReseña,
  eliminarReseña,
  obtenerReseñasDeUsuario
} = require('../controllers/reviewsController');

// ⭐ Crear reseña
router.post('/', protegerRuta, crearReseña);

// ⭐ Obtener reseñas de un juego
router.get("/game/:juegoId", protegerRuta, obtenerReseñasPorJuego);

// ⭐ Actualizar reseña
router.put("/:id", protegerRuta, actualizarReseña);

// ⭐ Eliminar reseña
router.delete("/:id", protegerRuta, eliminarReseña);

router.get("/my-reviews", protegerRuta, obtenerReseñasDeUsuario);
module.exports = router;

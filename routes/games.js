const express = require('express');
const router = express.Router();
const {
  crearJuego,
  obtenerJuegos,
  obtenerJuegoPorId,
  actualizarJuego,
  eliminarJuego,
  explorarJuegos
} = require('../controllers/gamesController');
const protegerRuta=require('../middlewares/authMiddleware');
// Rutas

router.route('/')
  .get(protegerRuta, obtenerJuegos)
  .post(protegerRuta, crearJuego);

router.route('/:id')
  .get(protegerRuta, obtenerJuegoPorId)
  .put(protegerRuta, actualizarJuego)
  .delete(protegerRuta, eliminarJuego);

router.route("/explore/all")
 .get(protegerRuta, explorarJuegos);

module.exports = router;

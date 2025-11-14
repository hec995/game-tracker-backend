const express = require("express");
const router = express.Router();
const protegerRuta = require("../middlewares/authMiddleware");
const Game = require("../models/Game");
const Review = require("../models/Review");

// 📌 Obtener estadísticas generales
router.get("/", protegerRuta, async (req, res) => {
  try {
    const totalJuegos = await Game.countDocuments();
    const juegosCompletados = await Game.countDocuments({ completado: true });
    const totalReseñas = await Review.countDocuments();

    const horasTotales = await Review.aggregate([
      { $group: { _id: null, total: { $sum: "$horasJugadas" } } }
    ]);

    const promedioPuntuacion = await Review.aggregate([
      { $group: { _id: null, promedio: { $avg: "$puntuacion" } } }
    ]);

    const mejorJuego = await Review.aggregate([
      { $group: { _id: "$juegoId", avgScore: { $avg: "$puntuacion" } } },
      { $sort: { avgScore: -1 } },
      { $limit: 1 }
    ]);

    res.json({
      totalJuegos,
      juegosCompletados,
      totalReseñas,
      horasTotales: horasTotales[0]?.total || 0,
      promedioPuntuacion: promedioPuntuacion[0]?.promedio || 0,
      mejorJuego: mejorJuego[0]?._id || null,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

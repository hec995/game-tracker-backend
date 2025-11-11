const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: [true, 'Debe estar asociado a un videojuego'],
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: 1,
    max: 5,
  },
  textoReseña: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio'],
  },
  horasJugadas: {
    type: Number,
    default: 0,
  },
  dificultad: {
    type: String,
    enum: ['Fácil', 'Normal', 'Difícil'],
    default: 'Normal',
  },
  recomendaria: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar la fecha de modificación
ReviewSchema.pre('save', function (next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model('Review', ReviewSchema);

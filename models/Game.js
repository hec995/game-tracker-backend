const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título del videojuego es obligatorio'],
    trim: true,
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    trim: true,
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria'],
    trim: true,
  },
  añoLanzamiento: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: 1950, // por si acaso
  },
  desarrollador: {
    type: String,
    required: [true, 'El desarrollador es obligatorio'],
    trim: true,
  },
  imagenPortada: {
    type: String,
    default: '', // URL de la imagen de portada
  },
  descripcion: {
    type: String,
    default: '',
  },
  completado: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  required: true }
    
});

// Exportar el modelo
module.exports = mongoose.model('Game', GameSchema);

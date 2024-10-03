const mongoose = require('mongoose')

const libroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        'Ficción',
        'No Ficción',
        'Ciencia Ficción',
        'Fantasía',
        'Romance',
        'Misterio',
        'Historia',
        'Autoayuda',
        'Infantil',
        'Biografía',
        'Fábula',
        'Suspenso'
      ]
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'reseñas' }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'usuarios',
      required: true
    },
    rating: { type: Number, min: 1, max: 5 }
  },
  {
    timestamps: true,
    collection: 'libros'
  }
)

const Libro = mongoose.model('libros', libroSchema)

module.exports = Libro

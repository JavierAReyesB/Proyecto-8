const mongoose = require('mongoose')

const reseñaSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'usuarios', required: true },
    libro: { type: mongoose.Types.ObjectId, ref: 'libros', required: true },
    audio: { type: String } // Nuevo campo para almacenar la URL del archivo de audio
  },
  {
    timestamps: true,
    collection: 'reseñas'
  }
)

const Reseña = mongoose.model('reseñas', reseñaSchema)

module.exports = Reseña

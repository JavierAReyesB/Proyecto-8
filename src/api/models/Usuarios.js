const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    libros: [{ type: mongoose.Types.ObjectId, ref: 'libros' }]
  },
  {
    timestamps: true,
    collection: 'usuarios'
  }
)

const Usuario = mongoose.model('usuarios', usuarioSchema)

module.exports = Usuario

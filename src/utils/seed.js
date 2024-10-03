require('dotenv').config()
const mongoose = require('mongoose')
const { connectDB } = require('../config/db')
const Libro = require('../api/models/Libros')
const Usuario = require('../api/models/Usuarios')
const Reseña = require('../api/models/Resenas')

const seedDB = async () => {
  try {
    await connectDB()

    await Libro.deleteMany({})
    await Usuario.deleteMany({})
    await Reseña.deleteMany({})

    const usuarios = [
      {
        username: 'lector1',
        email: 'lector1@correo.com',
        password: 'password123',
        role: 'user'
      },
      {
        username: 'admin1',
        email: 'admin@correo.com',
        password: 'adminpassword',
        role: 'admin'
      }
    ]

    const usuariosInsertados = await Usuario.insertMany(usuarios)

    const libros = [
      {
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        description: 'Una obra maestra de la literatura latinoamericana.',
        pages: 471,
        genre: 'Ficción',
        image: 'https://example.com/cien-anos-de-soledad.jpg',
        createdBy: usuariosInsertados[0]._id
      },
      {
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        description: 'Un libro de aventuras filosóficas para todas las edades.',
        pages: 96,
        genre: 'Fábula',
        image: 'https://example.com/el-principito.jpg',
        createdBy: usuariosInsertados[0]._id
      }
    ]

    const librosInsertados = await Libro.insertMany(libros)

    const reseñas = [
      {
        content: 'Un libro maravilloso lleno de magia y realismo.',
        user: usuariosInsertados[0]._id,
        libro: librosInsertados[0]._id
      },
      {
        content: 'Una lectura rápida pero llena de sabiduría.',
        user: usuariosInsertados[0]._id,
        libro: librosInsertados[1]._id
      }
    ]

    await Reseña.insertMany(reseñas)

    console.log('Datos iniciales cargados con éxito.')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error al cargar datos iniciales:', error)
    mongoose.connection.close()
  }
}

seedDB()

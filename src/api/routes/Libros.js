const {
  getLibros,
  getLibroById,
  getLibrosByCategory,
  postLibro,
  putLibro,
  deleteLibro
} = require('../controllers/Libros')

const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares')
const { upload } = require('../../middlewares/upload')

const librosRouter = require('express').Router()

librosRouter.get('/category/:category', getLibrosByCategory)
librosRouter.get('/:id', getLibroById)
librosRouter.get('/', getLibros)
librosRouter.post('/', verifyToken, upload.single('file'), postLibro)
librosRouter.put('/:id', verifyToken, upload.single('file'), putLibro)
librosRouter.delete('/:id', verifyToken, isAdmin, deleteLibro)

module.exports = librosRouter

const {
  getResenas,
  getResenaById,
  postResena,
  putResena,
  deleteResena
} = require('../controllers/Resenas')

const { verifyToken } = require('../../middlewares/authMiddlewares')
const { upload } = require('../../middlewares/upload')

const resenasRouter = require('express').Router()

resenasRouter.get('/:id', getResenaById)
resenasRouter.get('/', getResenas)
resenasRouter.post('/', verifyToken, upload.single('file'), postResena) // Permitir subida de archivos
resenasRouter.put('/:id', verifyToken, upload.single('file'), putResena) // Permitir subida de archivos en actualización
resenasRouter.delete('/:id', verifyToken, deleteResena)

module.exports = resenasRouter

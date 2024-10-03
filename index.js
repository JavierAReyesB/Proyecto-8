require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const librosRouter = require('./src/api/routes/Libros')
const usuariosRouter = require('./src/api/routes/Usuarios')
const resenasRouter = require('./src/api/routes/Resenas')
const authRouter = require('./src/api/routes/Auth')

const app = express()

app.use(express.json())

connectDB()

app.use('/api/v1/libros', librosRouter)
app.use('/api/v1/usuarios', usuariosRouter)
app.use('/api/v1/resenas', resenasRouter)
app.use('/api/v1/auth', authRouter)

app.use('*', (req, res) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000')
})

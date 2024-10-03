const multer = require('multer')
const { cloudinary } = require('../config/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configuración de storage con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      // Diferenciar la carpeta para libros y reseñas
      if (file.mimetype.startsWith('audio/')) {
        return 'reseñas' // Almacenar audios en la carpeta 'reseñas'
      } else {
        return 'libros' // Almacenar imágenes y PDFs en la carpeta 'libros'
      }
    },
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'mp3', 'wav'], // Añadimos formatos de audio
    public_id: (req, file) =>
      `${file.fieldname}-${Date.now()}-${file.originalname.split('.')[0]}`
  }
})

// Middleware de validación para el tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'audio/mp3',
    'audio/wav'
  ]
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Tipo de archivo no permitido')
    error.status = 400
    return cb(error, false)
  }
  cb(null, true)
}

// Middleware para la subida de archivos con validación del tipo de archivo
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Limita el tamaño del archivo a 10MB
})

module.exports = { upload }

# Proyecto 8 - API REST Files

Este proyecto consiste en una API RESTful creada con Express y conectada a una base de datos MongoDB Atlas mediante Mongoose. La API permite la gestión de **Libros**, **Reseñas** y **Usuarios**, con la funcionalidad de subir archivos a **Cloudinary** y relacionar reseñas con libros.

## Requisitos

- **Servidor Express**: Implementado y gestionado con nodemon para desarrollo.
- **Conexión a MongoDB Atlas**: Realizada mediante Mongoose.
- **Gestión de archivos**: Subida de imágenes, PDFs y audios a Cloudinary, con almacenamiento en diferentes carpetas para libros y reseñas.
- **CRUD completo**: Para las colecciones de libros, reseñas y usuarios.
- **Relaciones entre colecciones**: Las reseñas están asociadas a libros mediante el campo `libro` en el modelo de **Reseñas**.

## Instalación

1. Clonar el repositorio:

git clone https://github.com/tu_usuario/proyecto-8---api-rest-files.git
cd proyecto-8---api-rest-files

2. Instalar dependencias:

npm install

3. Configurar variables de entorno en un archivo `.env`:

DB_URL=mongodb+srv://librero:CL9GaAtT54EIs2lH@cluster0.lm4qc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=tu_jwt_secreto
CLOUDINARY_CLOUD_NAME=tu_cloudinary_cloud_name
CLOUDINARY_API_KEY=tu_cloudinary_api_key
CLOUDINARY_API_SECRET=tu_cloudinary_api_secret

4. Iniciar el servidor en modo desarrollo:

npm run dev

## Endpoints

### Usuarios

- **POST /api/v1/auth/register**: Registro de un nuevo usuario.
- **POST /api/v1/auth/login**: Inicio de sesión de un usuario y generación de token JWT.

### Libros

- **GET /api/v1/libros**: Obtiene todos los libros.
- **GET /api/v1/libros/:id**: Obtiene un libro por ID.
- **POST /api/v1/libros**: Crea un nuevo libro (requiere token de autenticación).
- **PUT /api/v1/libros/:id**: Actualiza un libro existente (requiere token de autenticación).
- **DELETE /api/v1/libros/:id**: Elimina un libro (requiere ser administrador).

### Reseñas

- **GET /api/v1/resenas**: Obtiene todas las reseñas.
- **GET /api/v1/resenas/:id**: Obtiene una reseña por ID.
- **POST /api/v1/resenas**: Crea una nueva reseña asociada a un libro (requiere token de autenticación).
- **PUT /api/v1/resenas/:id**: Actualiza una reseña existente (requiere token de autenticación).
- **DELETE /api/v1/resenas/:id**: Elimina una reseña (requiere token de autenticación).

### Usuarios

- **GET /api/v1/usuarios**: Obtiene todos los usuarios (requiere ser administrador).
- **GET /api/v1/usuarios/:id**: Obtiene un usuario por ID.
- **POST /api/v1/usuarios**: Crea un nuevo usuario.
- **PUT /api/v1/usuarios/:id**: Actualiza un usuario (requiere token de autenticación).
- **DELETE /api/v1/usuarios/:id**: Elimina un usuario (requiere token de autenticación).

## Relación entre colecciones

Cada reseña está asociada a un libro mediante el campo `libro` en el modelo de **Reseñas**. Esto permite obtener todas las reseñas relacionadas con un libro en particular.

## Subida de archivos

Los libros permiten subir imágenes o PDFs, que se almacenan en la carpeta `libros` en Cloudinary. Las reseñas permiten subir archivos de audio, que se almacenan en la carpeta `reseñas` en Cloudinary.

## Semilla de base de datos

Existe un archivo `seedDB.js` que permite cargar datos iniciales en las colecciones de usuarios, libros y reseñas.

node src/seedDB.js

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB** con **Mongoose**
- **Cloudinary** para gestión de archivos
- **JWT** para autenticación
- **Multer** para subida de archivos

## Notas

Los archivos subidos a **Cloudinary** son eliminados cuando los libros o reseñas correspondientes son eliminados de la base de datos.
La API está diseñada para ser escalable y puede ser ampliada según las necesidades del proyecto.

// const express = require('express');
// const cors = require('cors');
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');

// const app = express();

// // Middleware para procesar JSON
// app.use(express.json());

// // Middleware para habilitar CORS (permite solicitudes desde otros dominios, como el frontend)
// app.use(cors());

// // Importar las rutas de autenticación definidas en auth.js
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// // Documentación Swagger (OpenAPI)
// const swaggerDocument = YAML.load('./api-doc.yaml'); 
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Ruta base para verificar que el servidor funciona
// app.get('/', (req, res) => {
//     res.send('Servidor de autenticación funcionando correctamente 🚀');
// });

// // Inicializar el servidor en el puerto especificado
// const PORT = process.env.PORT || 3000; // Configurable con variables de entorno

// app.listen(PORT, () => {
//     console.log(`Servidor ejecutándose en el puerto ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mysql = require('mysql2');
const retry = require('async-retry'); // Importar async-retry

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Middleware para habilitar CORS (permite solicitudes desde otros dominios, como el frontend)
app.use(cors());

// Conexión a la base de datos MySQL con reintentos
const connectToDatabase = async () => {
  await retry(async () => {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect((err) => {
      if (err) {
        throw err; // Si hay un error, lo lanzamos y async-retry intentará de nuevo
      }
      console.log('Conectado a la base de datos MySQL');
    });
  }, {
    retries: 5, // Intentar 5 veces
    minTimeout: 2000, // Retrasar 2 segundos entre reintentos
  });
};

// Intentar conectar a la base de datos antes de arrancar el servidor
connectToDatabase().then(() => {
  // Importar las rutas de autenticación definidas en auth.js
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);

  // Documentación Swagger (OpenAPI)
  const swaggerDocument = YAML.load('./api-doc.yaml');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Ruta base para verificar que el servidor funciona
  app.get('/', (req, res) => {
    res.send('Servidor de autenticación funcionando correctamente 🚀');
  });

  // Inicializar el servidor en el puerto especificado
  const PORT = process.env.PORT || 3000; // Configurable con variables de entorno
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
});

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Middleware para habilitar CORS (permite solicitudes desde otros dominios, como el frontend)
app.use(cors());

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
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');  // Requerir mysql2
const router = express.Router();
const retry = require('async-retry');

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',  
    password: 'root',  
    database: 'deustoscooters',
});

// Verificar la conexión
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Clave secreta para JWT (idealmente manejar con variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Registrar usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    // Comprobar si el usuario ya existe en la base de datos
    db.query('SELECT * FROM usuarios WHERE username = ? OR email = ?', [username, email], async (err, result) => {
        if (err) {
            return res.status(500).send('Error en la consulta');
        }
        if (result.length > 0) {
            return res.status(400).send('El usuario o email ya está registrado');
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        db.query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send('Error al guardar el usuario en la base de datos');
            }
            res.status(201).send('Usuario registrado con éxito');
        });
    });
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validación básica
    if (!username || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    // Buscar usuario en la base de datos
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, result) => {
        if (err) {
            return res.status(500).send('Error en la consulta');
        }
        if (result.length === 0) {
            return res.status(400).send('Credenciales incorrectas');
        }

        const user = result[0];

        if (await bcrypt.compare(password, user.password)) {
            // Crear token JWT
            const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(400).send('Credenciales incorrectas');
        }
    });
});

// // Ruta protegida (opcional)
// router.get('/protected', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).send('Acceso denegado');

//     try {
//         const verified = jwt.verify(token, JWT_SECRET);
//         res.json({ message: 'Acceso permitido', user: verified });
//     } catch (err) {
//         res.status(401).send('Token inválido');
//     }
// });

module.exports = router;

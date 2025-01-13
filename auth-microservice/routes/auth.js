const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Simulación de base de datos en memoria
const users = [];

// Registrar usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    // Comprobar si el usuario ya existe
    const existingUser = users.find(
        (user) => user.username === username || user.email === email
    );
    if (existingUser) {
        return res.status(400).send('El usuario o email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Agregar el usuario a la "base de datos" en memoria
    users.push({ username, email, password: hashedPassword });

    res.status(201).send('Usuario registrado con éxito');
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validación básica
    if (!username || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    // Buscar usuario en la "base de datos"
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(400).send('Credenciales incorrectas');
    }

    // Validar la contraseña
    if (await bcrypt.compare(password, user.password)) {
        // Crear token JWT
        const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(400).send('Credenciales incorrectas');
    }
});

module.exports = router;

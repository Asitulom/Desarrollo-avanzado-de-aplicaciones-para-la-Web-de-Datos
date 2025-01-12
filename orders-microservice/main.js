const express = require('express');
const app = express();
app.use(express.json());

// Simulando una base de datos
let orders = [];

// Crear un pedido
app.post('/orders', (req, res) => {
    const order = { id: orders.length + 1, ...req.body };
    orders.push(order);
    res.status(201).json(order);
});

// Obtener todos los pedidos
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Obtener un pedido por ID
app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
});

// Actualizar un pedido
app.put('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: 'Order not found' });
    Object.assign(order, req.body);
    res.json(order);
});

// Eliminar un pedido
app.delete('/orders/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Order not found' });
    orders.splice(index, 1);
    res.status(204).send();
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Orders service running on port ${PORT}`));

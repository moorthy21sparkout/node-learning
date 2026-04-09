const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
// Basic route for testing server
app.get('/', (req, res) => {
    res.send('API Running...');
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    // Example event: broadcasting a message
    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

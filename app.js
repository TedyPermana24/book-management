const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

module.exports = app;

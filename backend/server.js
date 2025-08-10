const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const errorHandler = require('./middleware/errorHandler');
dotenv.config({ debug: true });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use('/api', urlRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

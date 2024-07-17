require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const servicesRouter = require('./routes/service.route');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Routes
app.use('/services', servicesRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


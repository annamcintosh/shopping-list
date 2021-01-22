const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const items = require('./routes/api/items.js');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//Connect to MongoDB
const db = process.env.MONGO_URI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/items', items);

//Set up port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

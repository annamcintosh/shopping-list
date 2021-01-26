const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv").config();

const app = express();

//Bodyparser Middleware
app.use(express.json());

//Connect to MongoDB
const db = process.env.MONGO_URI;
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/items', require('./routes/api/items.js'));
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));


//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Set up port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

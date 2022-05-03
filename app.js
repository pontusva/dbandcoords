const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const source = process.env.DB_CONNECTION;
const postRoute = require('./posts');
const weatherRoute = require ('./weather')
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(express.json());






app.use(express.static('project'));
app.use('/posts', postRoute);
app.use('/weather', weatherRoute);

app.listen(process.env.PORT || 3000,
    () => console.log("server is running..."));


    mongoose.connect(process.env.DB_CONNECTION, () => {
        console.log("connected do DB c:")
    });
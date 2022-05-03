const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const source = process.env.DB_CONNECTION;
const postRoute = require('./posts');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(express.json());




app.get('/weather', async (req, res) => {

    const resp = await axios.get(
        'http://localhost:3000/posts',
      ).then( async (data) => {
          const coords = data.data[data.data.length - 1];

         let lat = coords.lat;
         let lng = coords.lng
         try {    
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.API_TOKEN}`)
            const results = await response.json();
    
            
            const reject = () => {
                res.setHeader('www-authenticate', 'Basic')
                res.sendStatus(401)
              }
        
              const authorization = req.headers.authorization
          
              if(!authorization) {
                return reject()
              }
              const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')
          
              if(!(username === process.env.SECRET_USERNAME && password === process.env.SECRET_PASSWORD)) {
                return reject()
              }
              
            return res.json({
                success: true,
                results
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
      })
    

 
})
app.use(express.static('project'));
app.use('/posts', postRoute);

app.listen(process.env.PORT || 3000,
    () => console.log("server is running..."));


    mongoose.connect(process.env.DB_CONNECTION, () => {
        console.log("connected do DB c:")
    });
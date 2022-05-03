const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    
    
    const resp = await axios.get(
        'https://themostsecretapp.herokuapp.com/posts',
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


module.exports = router;
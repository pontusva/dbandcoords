const express = require('express');
const router = express.Router();
const Post = require('./Post');
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch(err) {
        res.json( { message: err } )
    }
});

router.post('/', async (req, res) => {
    
    async function getCoords() {
        const response = await axios.get(
          '/posts',
        ).then( async (data) => {
            const coords = data.data[data.data.length - 1];

           let lat = coords.lat;
           let lng = coords.lng

          

            const post = new Post({
                lat: lat,
                lng: lng,   
                
            });

            try {
                const savedPost = await post.save()
                res.json(savedPost);
            } catch (err) {
                res.json( { message: err } )
            }   
        })
      
        
        
      }
      
      getCoords();
    
    

    
});


module.exports = router;
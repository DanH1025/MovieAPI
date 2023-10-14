require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const movie = require('../models/movieModel')

// Add movies (POST)
const addMovies = async (req,res)=>{
    const {name,genre,country,score,description,vidQuality,length ,type, poster, year} = req.body

    try {
        if(!name || !genre || !country || !score || !description || !vidQuality || !type || !poster || !year){
            return res.status(200).json({
                message: 'Invalid information , please try again'
            })
        }else{
            const exists = await movie.find({
                $and: [
                    {name: name},
                    {year: year}
                ]
            })
    
            if(exists?.length === 0){
                const uid = uuidv4()
                const newMovie = new movie({
                    name: name,
                    genre: genre,
                    country: country,
                    score: score,
                    description: description,
                    vidQuality:vidQuality,
                    length: length,
                    type: type,
                    poster: poster,
                    year: year,
                    UID: uid
                })
                try {
                    await newMovie.save()
                    return res.status(200).json({
                        message: 'Success',
                        payload: newMovie
                    })
                } catch (error) {
                    return res.status(400).json({
                        message: 'Failed to create movie',
                        error: error
                    })
                }
                
            }else{
                return res.status(409).json({
                    message: 'Movie already exists'
                })
            }

        }
       
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        })
    }
}


// List of all movies (GET)
const getAllMovies = async (req,res)=>{
    try {
        const movies = await movie.find({})
        if(movies?.length === 0){
          return res.status(404).json({
            message: 'No movies found',
            error: error
          })
        }
        return res.status(200).json(movies)
      } catch (error) {
        return res.status(502).json({
          message: 'Failed to get all movies',
          error: error
        })
      }
}

// Movie details (GET)
// Movie search (GET)
// Movie rating and reviews (GET/POST)
// Movie recommendations (GET)
// Movie Categories and Genres:
// List of movie categories/genres (GET)
// Filter movies by category/genre (GET)

module.exports ={
    addMovies,
    getAllMovies
}
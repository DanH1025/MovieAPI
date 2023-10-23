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

// Movie details (GET) get by ID
const getMovieById = async (req,res) =>{
    const id = req.params._id
    try {
       const movi = await movie.findOne({_id:id})
       if(!movi){
         return res.status(404).json({
          messsage: 'Movie not found'
         })
       }
       return res.status(200).json(movi)
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error
      })
    }
}
// Movie details (GET) get by UUID
const getMovieByUUID = async (req,res)=>{
    const uuid = req.params.uuid
    try {
       const movies = await movie.findOne({uuid:uuid})
       if(!movies){
         return res.status(404).json({
          messsage: 'Movie not found'
         })
       }
       return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error
      })
    }
}

//filter movies by genres
const filterByGenre = async (req, res) => {
  const genre = req.params.genre
  try {
    const movies = await movie.find({ genre: { $in: [genre] } });
    if (movies.length === 0) {
      return res.status(404).json({
        message: 'No movies found with the specified genre',
      });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error,
    });
  }
};

//filter movies by year
const filterByYear = async (req, res) => {
  const year = req.params.year
  try {
    const movies = await movie.find({year: year})
    if (movies.length === 0) {
      return res.status(404).json({
        message: 'No movies found with the specified year',
      });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error,
    });
  }
};
//filter movies by quality
const filterByQuality = async (req, res) => {
  const quantity = req.params.quantity
  try {
    const movies = await movie.find({vidQuality: quantity})
    if (movies.length === 0) {
      return res.status(404).json({
        message: 'No movies found with the specified quality',
      });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error,
    });
  }
};





// List of movie categories/genres (GET)
// Filter movies by category/genre (GET)

module.exports ={
    addMovies,
    getAllMovies,
    getMovieById,
    getMovieByUUID,
    filterByGenre,
    filterByYear,
    filterByQuality
}
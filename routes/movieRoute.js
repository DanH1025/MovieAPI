const express = require('express');
const { addMovies, getAllMovies, getMovieById, getMovieByUUID, filterByGenre, filterByYear, filterByQuality } = require('../controllers/movieController');
const movieRoute = express.Router();


/**
 * @openapi
 * components:
 *  schemas:
 *      movie:
 *          required:
 *              - name
 *              - genre
 *              - country
 *              - score
 *              - description
 *              - vidQuality
 *              - type
 *              - poster
 *          properties:
 *              name:
 *                  type: string
 *                  example: "Titanic"
 *              genre:
 *                  type: array
 *                  example: [Drama , Romance , Adventure]
 *              country:
 *                  type: string
 *                  example: "United States"
 *              score:
 *                  type: string
 *                  example: "8.2"
 *              description:
 *                  type: string
 *                  example: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
 *              vidQuality:
 *                  type: string
 *                  example: "HD"
 *              length:
 *                  type: string
 *                  example: "3:14:54"
 *              type:
 *                  type: string
 *                  example: "Movie"
 *              poster:
 *                  type: array
 *                  example: ["https://tse4.explicit.bing.net/th?id=OIP.4GchANiYmqsVXNCOYVfQngHaJy&pid=Api&P=0&h=180", "https://tse1.mm.bing.net/th?id=OIP.3VvL5_ARQCk6aY-nGVS0PgHaK5&pid=Api&P=0&h=180"]
 *              year: 
 *                  type: number
 *                  example: 1998
 *      
 */

movieRoute.post('/register' , addMovies)
/**
 * @swagger
 * /movie/register:
 *  post:
 *      summary: Register a movie
 *      tags: [Movies]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/movie'
 *      responses:
 *          200:
 *              description: Movie successfully registered
 *          500:
 *              description: Error Saving user , Internal server error
 *          400:
 *              description: Failed to create movie
 *          409:
 *              description: Movie already exists
 *             
 * 
 */


movieRoute.get('/getAllMovies' , getAllMovies)
/**
 * @swagger
 * /movie/getAllMovies:
 *  get:
 *      summary: Get all movies
 *      tags: [Movies]
 *      responses:
 *          200:
 *              description: Got all the movies successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/movie'
 *          404:
 *              description: No movie found
 *          500:
 *              description: Server problems
 */

movieRoute.get('/getMovieById/:_id' , getMovieById)
/**
 * @swagger
 * '/movie/getMovieById/{_id}':
 *   get:
 *     tags: [Movies]
 *     summary: Find a movie by its Id
 *     parameters:
 *      - name: _id
 *        in: path
 *        description: The id of the movie
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/movie'
 *       404:
 *         description: user not found
 *       500:
 *          description: Internal Server Error
 */

movieRoute.get('/getMovieByUUID/:uuid', getMovieByUUID)
/**
 * @swagger
 * '/movie/getMovieByUUID/{uuid}':
 *   get:
 *     tags: [Movies]
 *     summary: Find a movie by its uuid
 *     parameters:
 *      - name: uuid
 *        in: path
 *        description: The uuid of the movie
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/movie'
 *       404:
 *         description: movie not found
 *       500:
 *          description: Internal Server Error
 */

movieRoute.get('/filterByGenre/:genre', filterByGenre)
/**
 * @swagger
 * '/movie/filterByGenre/{genre}':
 *   get:
 *     tags: [Movies]
 *     summary: Find a movie by its genre
 *     parameters:
 *      - name: genre
 *        in: path
 *        description: The genre of the movie
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/movie'
 *       404:
 *         description: movie not found
 *       500:
 *          description: Internal Server Error
 */
movieRoute.get('/filterByYear/:year', filterByYear)
/**
 * @swagger
 * '/movie/filterByYear/{year}':
 *   get:
 *     tags: [Movies]
 *     summary: Find a movie by its year
 *     parameters:
 *      - name: year
 *        in: path
 *        description: The year of the movie
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/movie'
 *       404:
 *         description: movie not found
 *       500:
 *          description: Internal Server Error
 */

movieRoute.get('/filterByQuality/:quantity', filterByQuality)
/**
 * @swagger
 * '/movie/filterByQuality/{quantity}':
 *   get:
 *     tags: [Movies]
 *     summary: Find a movie by its quantity
 *     parameters:
 *      - name: quantity
 *        in: path
 *        description: The quantity of the movie
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/movie'
 *       404:
 *         description: movie not found
 *       500:
 *          description: Internal Server Error
 */

module.exports = movieRoute


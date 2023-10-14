const express = require('express');
const { registerUser, login, getAllUsers, getUserById, getUserByUUID, updateUserName, updateEmail } = require('../controllers/userController');
const userRoute = express.Router();
const cors = require('cors');


/**
 * @openapi
 * components:
 *  schemas:
 *      registerUser:
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  example: "Dave"
 *              email:
 *                  type: string
 *                  example: "Dave@gmail.com"
 *              password:
 *                  type: string
 *                  example: "1234" 
 *      userLogin:
 *          required: 
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  example: "Dave@gmail.com"
 *              password:
 *                  type: string
 *                  example: "1234"
 * 
 */




userRoute.post('/register' , registerUser)
/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: Register a user
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/registerUser'
 *      responses:
 *          200:
 *              description: User successfully registered
 *          500:
 *              description: Error Saving user , Internal server error
 *          400:
 *              description: Failed to create user
 *          409:
 *              description: User already exists
 *             
 * 
 */
userRoute.post('/login', login)
/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: Login a user
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:  
 *                      $ref: '#/components/schemas/userLogin'
 *      responses:
 *          200:
 *              description: Login successful
 *          409:
 *              description:  Password auth failed
 *          204:
 *              description: Email not found
 *          400:
 *              description: Failed to login sorry :(
 * 
 *  
 */


//get all users
userRoute.get('/getAllUsers' , getAllUsers)
/**
 * @swagger
 * /user/getAllUsers:
 *  get:
 *      summary: Get all users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Got all the users successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/registerUser'
 *          404:
 *              description: No user found
 *          500:
 *              description: Server problems
 */

// get user by id
userRoute.get('/getUserById/:_id' , getUserById)
/**
 * @swagger
 * '/user/getUserById/{_id}':
 *   get:
 *     tags: [User]
 *     summary: Find a user by its Id
 *     parameters:
 *      - name: _id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/registerUser'
 *       404:
 *         description: user not found
 *       500:
 *          description: Internal Server Error
 */

// get user by uuid
userRoute.get('/getUserByUUID/:uuid' , getUserByUUID)
/**
 * @swagger
 * '/user/getUserByUUID/{uuid}':
 *   get:
 *     tags: [User]
 *     summary: Find a user by its uuid
 *     parameters:
 *      - name: uuid
 *        in: path
 *        description: The uuid of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *               $ref: '#/components/schemas/registerUser'
 *       404:
 *         description: user not found
 *       500:
 *          description: Internal Server Error
 */




//update  username by uuid
userRoute.put('/updateUsername/:uuid/:username' , updateUserName )
/**
 * @swagger
 * '/user/updateUsername/{uuid}/{username}':
 *      put:
 *          tags: [User]
 *          summary: Update username
 *          parameters:
 *              - name: uuid
 *                in: path
 *                description: the UUID of the user to be updated
 *                required: true
 *              - name: username
 *                in: path
 *                description: the username of the user to be updated
 *                required: true
 *          responses:
 *              200:
 *                  description: Successfully updated the username
 *              404:
 *                  description: User not found
 *              500:
 *                  description: Internal server error
 *      
 */
userRoute.put('/updateEmail/:uuid/:email', updateEmail)
/**
 * @swagger
 * '/user/updateEmail/{uuid}/{email}':
 *      put:
 *          tags: [User]
 *          summary: Update email
 *          parameters:
 *              - name: uuid
 *                in: path
 *                description: the UUID of the user to be updated
 *                required: true
 *              - name: email
 *                in: path
 *                description: the email of the user to be updated
 *                required: true
 *          responses:
 *              200:
 *                  description: Successfully updated the email
 *              404:
 *                  description: User not found
 *              500:
 *                  description: Internal server error
 *      
 */









module.exports = userRoute
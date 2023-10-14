require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./db/db')

//my routes
const userRoute = require('./routes/userRoute')

const app = express();

//what app needs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors())

//app uses routes
app.use('/user', userRoute)





//swagger doc

const options = {
    definition: { 
    openapi: '3.0.0',
    info: {
        title: 'Movie API',
        version: '1.0.0',
        description: 'A Movie API',
        contact: {
            name: 'Dano Hailu'
        }
    },
    servers: [
        { 
           url: 'http://localhost:3000'        
        }
    ],
    components: {
        securitySchemes:{
            bearerAuth:{
                type:'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },  
    },
    security: [
        {
            bearerAuth: [],
        }, 
    ],
    },
    apis: ['./routes/*.js' , './models/*.js']
}
const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB()
app.listen(process.env.PORT , ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})

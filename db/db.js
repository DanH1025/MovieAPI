require('dotenv').config()

const mongo = require('mongoose')
const connectDB = async ()=>{
    try {  
       await mongo.connect(process.env.DATABASE_URL , {  
            useNewUrlParser: true,  
            useUnifiedTopology: true
        }),
        console.log(`connected to db ${process.env.DATABASE_URL}`)
    } catch (error) {
        console.error('Connection to database failed')
        console.log(error);
        process.exit(1)  
            
    }
} 
 
module.exports = connectDB   
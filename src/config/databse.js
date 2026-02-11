require('dotenv').config();
const mongoose = require('mongoose');


 async function dbconnection(){
   await mongoose.connect(process.env.DATABASE_URl)
    .then(()=>{
        console.log('database connection done succesfully');
        
    })
}

module.exports=dbconnection;

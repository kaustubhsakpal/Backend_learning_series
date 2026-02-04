const app = require('./src/app')
const dbconnection = require('./src/config/databse')


dbconnection()
app.listen(3000,()=>{
    console.log('server running on port number 3000');
    
})
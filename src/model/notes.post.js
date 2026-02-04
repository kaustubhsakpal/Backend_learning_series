const mongoose = require('mongoose')


const postnotesSchema= new mongoose.Schema({
    title:String,
    description:String
})

const notesmodel = mongoose.model('post',postnotesSchema)

module.exports=notesmodel;
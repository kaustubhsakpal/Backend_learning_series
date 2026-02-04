const express = require('express');
const cors = require('cors')
const path =require('path')
const notesmodel = require('./model/notes.post')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.post('/post',async (req,res)=>{
      const {title, description}=req.body; 
    const note= await notesmodel.create({
        title,description
      })
      res.status(201).json({
        message:"note created succesfully",
        note
      })
      
})

app.get('/post',async(req,res)=>{
    const notes= await notesmodel.find()

     res.status(200).json({
         message:"data fetch succesfully",
         notes
     })
})


app.delete('/post/:id', async (req,res)=>{
    
    const {id} = req.params;
    const del= await notesmodel.findByIdAndDelete(id)
 

    console.log(del);
    
    res.status(200).json({
        message : "data delete succesfully",
        del
        
    })
})


app.patch('/post/:id', async (req,res)=>{
    const {description} = req.body
    const {id} = req.params;

    const update = await notesmodel.findByIdAndUpdate(id,{
        description
    })

    res.status(201).json({
        message:"update succesfully",
        update
    })
})

app.use('*name',(req,res)=>{
   res.sendFile(path.join(__dirname,'..','/public/index.html'))
})

module.exports=app;
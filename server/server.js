import express from "express"
import mongoose from "mongoose"

const app = express()
const conn = "mongodb+srv://donut:12345@donut.vqtqaoi.mongodb.net/test"

app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.listen(3000, ()=>{
    mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true }).then((result, error)=> {
        if(result){
            console.log('Connected to http://localhost:3000')}
        else if (error){
            console.error(error)
        }
    })
} )
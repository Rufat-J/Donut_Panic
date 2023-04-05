import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './routes/product-routes.js';
import restaurantsRouter from './routes/restaurants-routes.js';
import categoriesRoutes from './routes/categories-routes.js';
import ordersRouter from "./routes/orders-routes.js";
import usersRouter from "./routes/users-routes.js";
import session from 'express-session';

const app = express();

app.use(session({
    secret: '9;rr6na!/PDzmf2b=Zy+8H3f/yST!M423',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // set to true with https
        httpOnly: true,
        maxAge: 900000 // 15 minutes in milliseconds
    }
}))


const conn = 'mongodb+srv://donut:12345@donut.vqtqaoi.mongodb.net/test';

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.use('/api/restaurants', restaurantsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRouter)


app.listen(3000, ()=>{
    mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true }).then((result, error)=> {
        if(result){
            console.log('Connected to http://localhost:3000')}
        else if (error){
            console.error(error)
        }
    })
} )
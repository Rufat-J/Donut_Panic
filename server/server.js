import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './routes/product-routes.js';
import restaurantsRoutes from './routes/restaurants-routes.js';
import categoriesRoutes from './routes/categories-routes.js';

const app = express();
const conn = 'mongodb+srv://donut:12345@donut.vqtqaoi.mongodb.net/test';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/restaurants', restaurantsRoutes);
app.use('/products', productsRouter);
app.use('/categories', categoriesRoutes);

app.listen(1234, () => {
  mongoose
    .connect(conn, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result, error) => {
      if (result) {
        console.log('Connected to http://localhost:3000');
      } else if (error) {
        console.error(error);
      }
    });
});

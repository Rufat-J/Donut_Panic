import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import usersRouter from "./users-routes.js";

const productsRouter = Router();

const productsSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  image: String,
  ingredients: Array,
});

mongoose.model('products', productsSchema);

//const Products = mongoose.model('Products', productsSchema);

productsRouter.post('/', async (req, res) => {
  try {
    const product = new mongoose.model('products')({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      ingredients: req.body.ingredients,
    });
    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

productsRouter.get('/', async (req, res) => {
  try {
    let products = await mongoose.models.products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});


productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await mongoose.models.products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});


productsRouter.delete('/:id', async (req, res) => {
  try {
    await mongoose.models.products.findByIdAndDelete(req.params.id);
    const result = await mongoose.models.products.findById(req.params.id);
    res.json({ message: 'deleted', result });
  } catch (error) {
    res.status(500).json(error);
  }
});

productsRouter.patch('/:id', async (req, res) => {
  try {
    const updatedProducts = await mongoose.models.products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default productsRouter;





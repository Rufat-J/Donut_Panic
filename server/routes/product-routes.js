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

mongoose.model('Products', productsSchema);

//const Products = mongoose.model('Products', productsSchema);

productsRouter.post('/', async (req, res) => {
  try {
    const product = new mongoose.model('Products')({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      ingredients: req.body.ingredients,
    });
    const createdProduct = await product.save();

    res.status(201).json({ message: 'Product created', data: createdProduct });
  } catch (error) {
    res.status(500).json(error);
  }
});

productsRouter.get('/', async (req, res) => {
  try {
    let products = await mongoose.models.Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});


productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await mongoose.models.Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});




productsRouter.delete('/:id', async (req, res) => {
  try {
    await mongoose.models.Products.findByIdAndDelete(req.params.id);
    const result = await mongoose.models.Products.findById(req.params.id);
    res.json({ message: 'deleted', result });
  } catch (error) {
    res.status(500).json(error);
  }
});

productsRouter.patch('/:id', async (req, res) => {
  try {
    const updatedProducts = await mongoose.models.Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: 'Updated',
      data: updatedProducts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default productsRouter;

import Router from "express";
import mongoose, { Schema } from "mongoose";

const categoriesRouter = Router();

const categoriesSchema = new Schema({
    category: String,
});

mongoose.model("categories", categoriesSchema);

const Category = mongoose.model('Categories', categoriesSchema);

categoriesRouter.post('/', async (req, res) => {
    try {
        const category = new Category({
            category: req.body.category,
        });

        const createdCategory = await category.save();

        res.status(201).json({ message: 'Category created', data: createdCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

categoriesRouter.get("/", async (req, res) => {
    try {
        const categories = await mongoose.models.categories.find();
        res.status(200).json({
            data: categories});
    }
    catch(error) {
        res.status(500).json(error)
    }

});

categoriesRouter.get("/:id", async (req, res) => {
    try {
        const category = await mongoose.models.categories.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(error) {
        res.status(500).json(error)
    }
});


categoriesRouter.delete("/:id", async (req, res) => {
    try {
        await mongoose.models.categories.findByIdAndDelete(req.params.id);
        const result = await mongoose.models.categories.findById(req.params.id);
        res.json({message: "deleted", result});
    } catch (error) {
        res.status(500).json(error)
    }

});

categoriesRouter.patch("/:id", async (req, res) => {
    try {
        const updatedCategories = await mongoose.models.categories.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message : "Updated",
            data: updatedCategories});
    } catch (error) {
        res.status(500).json(error);
    }
});

export default categoriesRouter;

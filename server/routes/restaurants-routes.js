import Router from "express";
import mongoose, { Schema } from "mongoose";

const restaurantsRouter = Router();

const restaurantsSchema = new Schema({
    name: String,
    location: String,
});

mongoose.model("Restaurants", restaurantsSchema);

restaurantsRouter.post("/", async (req, res) => {
    try {
        const restaurant = new mongoose.model("Restaurants")({
            name: req.body.name,
            location: req.body.location,
        });
        const createdRestaurant = await restaurant.save();
        res.status(201).json({
            status: "Restaurant created",
            data: createdRestaurant,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


restaurantsRouter.get("/", async (req, res) => {
    try {
        const restaurants = await mongoose.models.Restaurants.find();
        res.status(200).json({
            result: restaurants.length,
            data: restaurants});
    }
    catch(error) {
        res.status(500).json(error)
    }

});

restaurantsRouter.get("/:id", async (req, res) => {
    try {
        const restaurant = await mongoose.models.Restaurants.findById(req.params.id);
        res.status(200).json(restaurant);
    }
    catch(error) {
        res.status(500).json(error)
    }
});


restaurantsRouter.delete("/:id", async (req, res) => {
    try {
        await mongoose.models.Restaurants.findByIdAndDelete(req.params.id);
        const result = await mongoose.models.Restaurants.findById(req.params.id);
        res.json({message: "deleted"});
    } catch (error) {
        res.status(500).json(error)
    }

});

restaurantsRouter.patch("/:id", async (req, res) => {
    try {
        const updatedRestaurant = await mongoose.models.Restaurants.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message : "Updated",
            data: updatedRestaurant});
    } catch (error) {
        res.status(500).json(error);
    }
});

export default restaurantsRouter;

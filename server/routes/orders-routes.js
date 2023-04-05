import Router from "express";
import mongoose, { Schema } from "mongoose";

const ordersRouter = Router();


const ordersSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    },
    total_price: Number,
    status: String,
    // pickup_time: Date,
    // order_time: Date,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
});

mongoose.model("Orders", ordersSchema);

ordersRouter.post("/", async (req, res) => {
    try {
        const order = new mongoose.model("Orders")({
            status: req.body.status,
            user: req.body.user,
            restaurant: req.body.restaurant,
            total_price: req.body.total_price,
            products: req.body.products,
            //pickup_time: req.body.pickup_time,
            //order_time: req.body.order_time,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

ordersRouter.get("/", async (req, res) => {
    const orders = await mongoose.models.Orders.find().populate("user").populate("products").exec();
    res.status(200).json(orders);
});

ordersRouter.get("/:id", async (req, res) => {
    try {
        const order = await mongoose.models.Orders.findById(req.params.id).populate("user").exec();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});



ordersRouter.delete("/:id", async (req, res) => {
    try {
        await mongoose.models.Orders.findByIdAndDelete(req.params.id);
        res.json({ message: "deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
});

ordersRouter.patch("/:id", async (req, res) => {
    try {
        const updatedOrder = await mongoose.models.Orders.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default ordersRouter;

import Router from "express";
import mongoose, { Schema } from "mongoose";

const ordersRouter = Router();

const ordersSchema = new Schema({
    user: [{type: mongoose.Schema.Types.ObjectId,
        ref: "users"}],
    restaurant: [{type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"}],
    total_price: Number,
    status: String,
    pickup_time: Date,
    order_time: Date,
    products: [{type: mongoose.Schema.Types.ObjectId,
    ref: "products"}],
});

mongoose.model("Orders", ordersSchema);

ordersRouter.post("/", async (req, res) => {
    try {
        const order = new mongoose.model("Orders")({
            status: req.body.status,
            user: req.body.user,
            restaurant: req.body.restaurant,
            total_price: req.body.total_price,
            pickup_time: req.body.pickup_time,
            order_time: req.body.pickup_time,
            products: req.body.pickup_time,

        });
        const createdOrder = await order.save();
        res.status(201).json({
            status: "Order created",
            data: createdOrder,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


ordersRouter.get("/", async (req, res) => {
    try {
        const orders = await mongoose.models.Orders.find();
        res.status(200).json({
            result: orders.length,
            data: orders});
    }
    catch(error) {
        res.status(500).json(error)
    }

});

ordersRouter.get("/:id", async (req, res) => {
    try {
        const order = await mongoose.models.Orders.findById(req.params.id);
        res.status(200).json(order);
    }
    catch(error) {
        res.status(500).json(error)
    }
});


ordersRouter.delete("/:id", async (req, res) => {
    try {
        await mongoose.models.Orders.findByIdAndDelete(req.params.id);
        const result = await mongoose.models.Orders.findById(req.params.id);
        res.json({message: "deleted"});
    } catch (error) {
        res.status(500).json(error)
    }

});

ordersRouter.patch("/:id", async (req, res) => {
    try {
        const updatedOrder = await mongoose.models.Orders.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message : "Updated",
            data: updatedOrder});
    } catch (error) {
        res.status(500).json(error);
    }
});

export default ordersRouter;

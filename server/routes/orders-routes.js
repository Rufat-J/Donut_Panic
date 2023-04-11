import Router from "express";
import mongoose, {Schema} from "mongoose";

const ordersRouter = Router();


const ordersSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
    }, restaurant: {
        type: mongoose.Schema.Types.ObjectId, ref: "restaurants",
    },
    total_price: Number,
    status: {
        type: String,
        default: "pending",
    },
    pickup_time: {
        type: Date,
        default: function () {
            const now = new Date();
            const pickupTime = new Date(
                now.getTime() +
                5 * 60 * 1000 +
                Math.min(15 * 60 * 1000, 60 * 1000 * Math.floor(this.products.reduce((acc, product) => acc + product.quantity, 0) / 2))
            );
            return pickupTime;
        },
    },
    // order_time: Date,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: "products",
        },
        quantity: Number,
        name: String,
        price: Number,
    },

    ],
});

const OrdersModel = mongoose.model("Orders", ordersSchema);

ordersRouter.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const order = new OrdersModel({
            status: req.body.status,
            user: req.body.userID,
            restaurant: req.body.restaurant,
            total_price: req.body.totalPrice,
            products: req.body.cartItems,
            quantity: req.body.quantity,
            price: req.body.price,
            //pickup_time: req.body.pickup_time,
            //order_time: req.body.order_time,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

ordersRouter.get("/", async (req, res) => {
    const orders = await
        OrdersModel.find()
            .populate("user")
            .populate("products")
            .exec();
    res.status(200).json(orders);
});

ordersRouter.get("/:id", async (req, res) => {
    try {
        const order = await OrdersModel.findById(req.params.id)
            .populate("user")
            .populate("products")
            .exec();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});


ordersRouter.delete("/:id", async (req, res) => {
    try {
        await OrdersModel.findByIdAndDelete(req.params.id);
        res.json({message: "deleted"});
    } catch (error) {
        res.status(500).json(error);
    }
});

ordersRouter.patch("/:id", async (req, res) => {
    try {
        const updatedOrder = await OrdersModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});


export default ordersRouter;

import Router from "express";
import mongoose, { Schema } from "mongoose";

const usersRouter = Router();

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone_number: String,
    restaurant: [{type: mongoose.Schema.Types.ObjectId, ref: 'restaurants'}],
    role: String
}).populate('restaurant');

mongoose.model("users", userSchema);

usersRouter.post("/", async (req, res) => {
    try {
        const user = new mongoose.model("users")({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            restaurant: req.body.restaurant,
            role: req.body.role
        });
        const createUser = await user.save();
        res.status(201).json({
            status: "user created",
            data: createUser,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


usersRouter.get("/", async (req, res) => {
    try {
        const users = await mongoose.models.users.find().populate('restaurants');
        res.status(200).json({
            result: users.length,
            data: users});
    }
    catch(error) {
        res.status(500).json(error)
    }

});


usersRouter.get("/:id", async (req, res) => {
    try {
        const user = await mongoose.models.users.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json(error)
    }
});


usersRouter.delete("/:id", async (req, res) => {
    try {
        await mongoose.models.users.findByIdAndDelete(req.params.id);
        const result = await mongoose.models.users.findById(req.params.id);
        res.json({message: "deleted"});
    } catch (error) {
        res.status(500).json(error)
    }

});

usersRouter.patch("/:id", async (req, res) => {
    try {
        const updatedUser = await mongoose.models.users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message : "Updated",
            data: updatedUser});
    } catch (error) {
        res.status(500).json(error);
    }
});

export default usersRouter;

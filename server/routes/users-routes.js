import Router from "express";
const usersRouter = Router();

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    phone: String
});

const UserModel = mongoose.model("users", userSchema);

usersRouter.post("/", async (req, res) => {
    try {
        const user = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            phone: req.body.phone
        });

        const createdUser = await user.save();

        res.status(201).json({
            status: "user created"
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

usersRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json(error)
    }
});

usersRouter.get("/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(error)
    }
});

usersRouter.delete("/:id", async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({message: "deleted"});
    } catch (error) {
        res.status(500).json(error)
    }
});

usersRouter.patch("/:id", async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message : "Updated",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default usersRouter;

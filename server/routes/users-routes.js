import Router from "express";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const usersRouter = Router();

const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    phone: String,
    isAdmin: Boolean,
});

const UserModel = mongoose.model("users", userSchema);

usersRouter.post("/", async (req, res) => {
    try {
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            phone: req.body.phone,
        });

        const createdUser = await user.save();

        res.status(201).json({
            status: "user created",
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

usersRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

usersRouter.get("/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

usersRouter.delete("/:id", async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: "deleted" });
    } catch (error) {
        res.status(500).json(error);
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
            message: "Updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

usersRouter.post('/register', async (req, res) => {
    const { name, email, password, phone, isAdmin } = req.body;

    try {
        // check if user with same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // if user already exists, throw an error
            throw new Error('User already exists with this email');
        }

        // if user does not already exist, create a new user
        const newUser = new User({
            name,
            email,
            password,
            phone,
            isAdmin
        });

        // save the new user to the database
        const savedUser = await newUser.save();

        // send a success response to the client
        res.status(201).json(savedUser);
    } catch (err) {
        // if an error occurred, send an error response to the client
        res.status(400).json({ message: err.message });
    }
});

usersRouter.post("/login", async (req, res) => {
    try {
        const { email, password, } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            // User not found
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            // Incorrect password
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({id: user._id}, "secret");

        // User is authenticated
        res.json({
            success:true,
            token,
            userID: user._id,
            name: user.name,
            isAdmin: user.isAdmin});
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "An error occurred, please try again" });
    }
});

export default usersRouter;

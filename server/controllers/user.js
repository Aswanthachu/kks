import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import User from "../models/user.js";

export const userSignup = async (req, res) => {
    const { type } = req.body;

    if (type === "manual") {
        const { username, email, password } = req.body;


        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "User already exist." });
            }

            // const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALT_ROUND);
            const salt = bcrypt.genSaltSync(12);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const newUser = await User.create({ username, email, hashedPassword });
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });

        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }
    else if (type === "google") {

        const { username, email, profilePic, uid } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.status(400).json({ message: "User already exist." });
            }

            const newUser = await User.create({ username, email, profilePic, uid });
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });
        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }
    else if (type === "facebook") {

        const { username, email, profilePic, uid } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.status(400).json({ message: "User already exist." });
            }

            const newUser = await User.create({ username, email, profilePic, uid });
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });
        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }

    else if (type === "apple") {

        const { username, email, profilePic } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.status(400).json({ message: "User already exist." });
            }

            const newUser = await User.create({ username, email, profilePic });
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });
        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }
}

export const userLogin = async (req, res) => {
    const { type } = req.body;

    if (type === "manual") {

        const { email, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                res.status(200).json({ message: "User not exist." });
            } else {
                
                const correctUser = await bcrypt.compare(password, existingUser.hashedPassword);

                if (correctUser) {
                    // const token = jwt.sign({ username, id: existingUser._id }, process.env.JWT_SECRET);
                    const token = jwt.sign({ email, id: existingUser._id }, "test", { expiresIn: '1h' });
                    res.cookie('api-auth', token,{
                        secure:false,
                        httpOnly:true,
                        expires:dayjs().add(7,"days").toDate()
                    });
                    res.status(200).json({ existingUser });

                } else {
                    res.status(400).json({ message: "Invalid email or password" });
                }

            }

        } catch (error) {
            console.log(error);
        }
    }
    else if (type === "google") {

        console.log("hii");

        const { email, profilePic, uid, username } = req.body;
        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                res.status(200).json({ message: "User not exist." });
            }

            // const token = jwt.sign({ username, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const token = jwt.sign({ email, id: existingUser._id }, "test", { expiresIn: '1h' });
            res.cookie('api-auth', token,{
                secure:false,
                httpOnly:true,
                expires:dayjs().add(7,"days").toDate()
            });
            res.status(200).json({ existingUser });

        } catch (error) {
            console.log(error);
        }
    }
    else if (type === "facebook") {

        const { email, profilePic, uid, username } = req.body;
        try {
            const existingUser = User.findOne({ email });

            if (!existingUser) {
                res.status(200).json({ message: "User not exist." });
            }
            // const token = jwt.sign({ username, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const token = jwt.sign({ email, id: existingUser._id }, "test", { expiresIn: '1h' });
            res.cookie('api-auth', token,{
                secure:false,
                httpOnly:true,
                expires:dayjs().add(7,"days").toDate()
            });
            res.status(200).json({ existingUser, message: "successfully logged in.." });

        } catch (error) {
            console.log(error);
        }
    }
}
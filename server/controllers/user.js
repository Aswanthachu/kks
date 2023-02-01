import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
            const newUser = await User.create({ username, email, salt, hashedPassword });
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });

        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }
    else if (type === "google") {

        const { username, email, profilePic,accessToken } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.status(400).json({ message: "User already exist." });
            }

            const newUser = await User.create({ username, email,profilePic,accessToken});
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });
        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }
    else if (type === "facebook") {

        const { username, email, profilePic } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.status(400).json({ message: "User already exist." });
            }

            const newUser = await User.create({ username, email,profilePic});
            res.status(200).json({ userData: newUser, message: "user signed up successfully.." });
        } catch (error) {
            res.status(401).json({ message: "server error" });
            console.log(error);
        }
    }
}

export const userLogin = async (req, res) => {
    console.log("hiii")

}
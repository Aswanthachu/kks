import express from "express";

import { 
    userSignup, 
    userLogin } from "../controllers/user.js";

import { userValidation } from "../middlewares/userValidation.js";

const router = express.Router();

router.post('/signup',userValidation, userSignup);
router.post('/login', userLogin);

export default router;
import express from "express";
import { register } from "../controllers/auth.controller";

const router = express.Router();

//* register route
router.post('/register', register);

//* login

//* change password

//* change profile image 

export default router;
import express from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidator } from "../validators/auth.validator";

const router = express.Router();

//* register route
router.post('/register', register);

//* login
router.post('/login', validate(loginValidator), login);


//* change password

//* change profile image 

export default router;
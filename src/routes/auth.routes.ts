import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidator } from "../validators/auth.validator";
import uploader from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();
const upload = uploader();

//* register route and profile image - multipart/form-data
router.post("/register", upload.single("profile_image"), register);

//* login
router.post("/login", validate(loginValidator), login);

//* get profile
router.get('/profile', authenticate(), getProfile);

//* change password

//* change profile image

export default router;



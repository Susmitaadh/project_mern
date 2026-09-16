import express from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidator } from "../validators/auth.validator";
import uploader from "../middlewares/multer.middleware";

const router = express.Router();
const upload = uploader();

//* register route and profile image - multipart/form-data
router.post("/register", upload.single("profile_image"), register);

//* login
router.post("/login", validate(loginValidator), login);

//* change password

//* change profile image

export default router;

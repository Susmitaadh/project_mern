import express, { Request } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidator } from "../validators/auth.validator";
import multer from "multer";
import fs from "fs";

//* create upload folder if not exists
const folder = "uploads/";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

//* multer disk storage
const storage = multer.diskStorage({
  destination: (_: Request, __: Express.Multer.File, callback) => {
    callback(null, folder);
  },
  filename: (_: Request, file: Express.Multer.File, callback) => {
    const fileName = Date.now() + "-" + file.originalname;
    callback(null, fileName);
  },
});

//* multer upload instance
const upload = multer({
  storage: storage,
});

const router = express.Router();

//* register route and profile image - multipart/form-data
router.post("/register", upload.single("profile_image"), register);

//* login
router.post("/login", validate(loginValidator), login);

//* change password

//* change profile image

export default router;

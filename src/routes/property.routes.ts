import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";
import uploader from "../middlewares/multer.middleware";
import { create } from "../controllers/property.controller";

const router = Router();
const upload = uploader();

router.post(
    '/', 
    authenticate([Role.HOST]), 
    // {cover_image: [{}], images: [{}, {}]}
    upload.fields([
        {
            name: "cover_image",
            maxCount: 1,
        },
        {
            name: "images",
            maxCount: 8,
        },
    ]),
    create,

export default router;


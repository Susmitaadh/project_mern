import { Router } from "express";
import {
    getAll,
    getById,
    create,
    update,
    remove,
} from "../controllers/amenity.controller.ts";
import uploader from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";



const route = Router();
const upload = uploader();

route.get("/", getAll);
route.get("/:id", getById);
route.post("/", upload.single("logo"), validate(amenityValidator), create);
route.put("/:id", upload.single("logo"), update);
route.delete("/:id", remove);

export default route;




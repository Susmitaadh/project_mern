import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/amenity.controller.js";
import uploader from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { amenityValidator } from "../validators/amenity.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { Role } from "../types/enum.types.js";

const route = Router();
const upload = uploader();

route.get("/", authenticate([Role.HOST, Role.ADMIN, Role.USER]), getAll);
route.get("/:id", getById);
route.post(
  "/",
  authenticate(), 
  upload.single("logo"),
  validate(amenityValidator),
  create,
);
route.put("/:id", upload.single("logo"), update);
route.delete("/:id", remove);

export default route;

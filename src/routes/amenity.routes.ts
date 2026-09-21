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

route.get("/", authenticate([Role.HOST, Role.ADMIN]), getAll);
route.get("/:id", authenticate([Role.HOST, Role.ADMIN]), getById);
route.post(
  "/",
  authenticate([Role.HOST]), 
  upload.single("logo"),
  validate(amenityValidator),
  create,
);
route.put("/:id", authenticate([Role.HOST]), upload.single("logo"), update);
route.delete("/:id", authenticate([Role.HOST, Role.ADMIN]), remove);

export default route;

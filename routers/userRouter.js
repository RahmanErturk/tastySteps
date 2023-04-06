import { Router } from "express";
import * as controller from "../controllers/userController.js";

const router = Router();

router
  .get("/", controller.getAllUsers)
  .get("/:userId", controller.getUser)
  .patch("/:userId", controller.updateUser)
  .delete("/:userId", controller.deleteUser);

export default router;

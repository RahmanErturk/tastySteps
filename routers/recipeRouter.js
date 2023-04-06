import { Router } from "express";
import * as controller from "../controllers/recipeController.js";

import { postSchema } from "./recipeRouter.schema.js";
import validate from "../middlewares/validate.js";

const router = Router();

router
  .get("/", controller.getAllRecipes)
  .get("/:recipeId", controller.getRecipe)
  .post("/", validate(postSchema), controller.createRecipe)
  .patch("/:recipeId", /*validate(postSchema),*/ controller.updateRecipe)
  .put("/:recipeId", /*validate(postSchema),*/ controller.replaceRecipe)
  .delete("/:recipeId", controller.deleteRecipe);

export default router;

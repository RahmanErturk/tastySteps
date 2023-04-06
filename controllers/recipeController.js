import * as Recipe from "../models/Recipe.js";
import { faker } from "@faker-js/faker";

// const errorSwitch = (err) => {
//   switch (err.path) {
//     case "_id":
//       err.statusCode = 404;
//       err.message = "Not Found";
//       break;
//     default:
//       err.statusCode = 400;
//       err.message = "Check your entry.";
//   }

//   return err;
// };

export const createRecipe = async (req, res, next) => {
  try {
    const result = await Recipe.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const getAllRecipes = async (req, res, next) => {
  try {
    const result = await Recipe.getAll();
    res.status(200).json(result);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const getRecipe = async (req, res, next) => {
  try {
    const result = await Recipe.getOne(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateRecipe = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }

  try {
    const result = await Recipe.updateOne(req.params.recipeId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const replaceRecipe = async (req, res, next) => {
  try {
    const result = await Recipe.replaceOne(req.params.recipeId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    await Recipe.deleteOne(req.params.recipeId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

import mongoose from "mongoose";
import * as Schemas from "./Schemas.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: Array,
      required: true,
    },

    ingredients: [Schemas.ingredients],

    category: Schemas.category,

    image: {
      type: String,
      required: true,
    },

    preparationTime: {
      type: Number,
      required: true,
    },

    portion: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    comments: [Schemas.comments],

    recipeRanking: [Number],

    explanation: String,
  },
  {
    versionKey: false,
  }
);

const Recipe = mongoose.model("Recipe", schema);

export const getAll = async () => {
  const recipes = await Recipe.find().populate("user");
  return recipes;
};

export const getOne = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId).populate("user");

  return recipe;
};

export const create = async (doc) => {
  const newRecipe = await Recipe.create(doc);

  return newRecipe;
};

export const updateOne = async (recipeId, data) => {
  const recipe = await Recipe.findByIdAndUpdate(recipeId, data, {
    new: true,

    runValidators: true,
  });

  return recipe;
};

export const replaceOne = async (recipeId, data) => {
  const recipe = await Recipe.findOneAndReplace(
    {
      _id: recipeId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  return recipe;
};

export const deleteOne = async (recipeId) => {
  const recipe = await Recipe.findByIdAndDelete(recipeId);

  return recipe;
};

export default Recipe;

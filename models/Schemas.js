import mongoose from "mongoose";

export const category = new mongoose.Schema(
  {
    mealType: {
      type: String,
      enum: [
        "Appetizer",
        "Main Course",
        "Breakfast",
        "Salad",
        "Dessert",
        "Snacks",
        "Drinks",
      ],
    },

    meal: {
      type: String,
      enum: [
        "Meat Dishes",
        "Fish Dishes",
        "Pizza & Pasta",
        "Baking",
        "Soups & Stews",
        "Salad",
        "Sides",
        "Dessert",
        "Casserole",
        "Snacks",
      ],
    },

    region: {
      type: String,
      enum: [
        "Asian",
        "Chinese",
        "German",
        "British",
        "French",
        "Arabic",
        "Greek",
        "Indian",
        "Italian",
        "Japanese",
        "Mexican",
        "European",
        "Spanish",
        "Turkish",
        "Oriental",
        "American",
      ],
    },
    nutrition: {
      type: String,
      enum: [
        "Vegan",
        "Vegetarian",
        "Sugar Free",
        "Lactose Free",
        "Gluten Free",
        "Non-alcoholic",
      ],
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

export const ingredients = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: Number,
    measure: String,
  },
  {
    _id: false,
    versionKey: false,
  }
);

export const comments = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

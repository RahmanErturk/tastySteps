import { Schema, model } from "mongoose";

const shoppingList = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const userSchema = new Schema(
  {
    googleId: String,
    provider: String,
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    likedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    shoppingList: [shoppingList],
    // weeklyPlan: []
  },
  {
    versionKey: false,
  }
);

const User = model("User", userSchema);

export const create = async (data) => {
  const newUser = await User.create(data);

  return newUser;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getOne = async (filter) => {
  const result = await User.findOne(filter);
  return result;
};

export const getOneUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const updateOne = async (userId, data) => {
  const album = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });

  return album;
};

export const deleteOne = async (userId) => {
  const result = await User.findByIdAndDelete(userId);

  return result;
};

export default User;

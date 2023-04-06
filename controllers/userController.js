import * as User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();

    const allUsers = users.map((user) => {
      return {
        userName: user.userName,
        email: user.email,
        id: user._id,
        image: user.image,
        recipes: user.recipes,
        likedRecipes: user.likedRecipes,
        savedRecipes: user.savedRecipes,
        shoppingList: user.shoppingList,
      };
    });
    res.status(200).json(allUsers);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.getOneUser(req.params.userId);

    const userInfo = {
      userName: user.userName,
      email: user.email,
      id: user._id,
      image: user.image,
      recipes: user.recipes,
      likedRecipes: user.likedRecipes,
      savedRecipes: user.savedRecipes,
      shoppingList: user.shoppingList,
    };

    res.status(200).json(userInfo);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }

  try {
    const result = await User.updateOne(req.params.userId, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne(req.params.recipeId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

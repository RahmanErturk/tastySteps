import bcrypt from "bcrypt";

import { signToken } from "../lib/token.js";
import * as User from "../models/User.js";
import Cookie from "../lib/cookie.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.getOne({ email: req.body.email });

    if (user) {
      const err = new Error("Benutzer existiert schon!");
      err.statusCode = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      recipes: [],
      likedRecipes: [],
      shoppingList: [],
    });

    Cookie(newUser, res);

    res.status(201).json({
      userName: newUser.userName,
      _id: newUser._id,
    });
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.getOne({ email: req.body.email });

    if (!user) {
      const err = new Error("Email or password incorrect");
      err.statusCode = 400;
      throw err;
    }

    // überprpüfen des passworts
    const isPasswordEqual = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // response senden
    if (isPasswordEqual) {
      Cookie(user, res);

      res.status(200).json({
        msg: "Successfully logged in",
        id: user._id,
        email: user.email,
      });
    } else {
      const err = new Error("Oops! Something went wrong");
      err.statusCode = 400;
      throw err;
    }
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("logged_in");
  res.clearCookie("jwt");

  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send();
  });

  // try {
  //   res.status(200).send();
  // } catch (error) {
  //   return next(error);
  // }
};

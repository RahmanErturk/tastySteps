import { Router } from "express";
import * as controller from "../controllers/authController.js";

import { postSchema } from "./authRouter.schema.js";
import validate from "../middlewares/validate.js";

import passport from "passport";

const router = Router();

router
  .post("/register", validate(postSchema), controller.register)
  .post("/login", controller.login)
  .get("/logout", controller.logout)
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/register",
    }),
    async (req, res) => {
      res.cookie("logged_in", req.session.passport.user, {
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      });
      await res.redirect("/");
    }
  );

export default router;

import { signToken } from "./token.js";
import * as User from "../models/User.js";

export default function cookieGenerator(user, response) {
  // token erstellen
  const token = signToken({ id: user._id });

  // token in einem cookie hinzufügen
  const expiresIn = 1000 * 60 * 60 * 24;

  response.cookie("jwt", token, {
    sameSite: "lax",
    maxAge: expiresIn,
    httpOnly: true,
  });
  response.cookie("logged_in", user._id.toString(), {
    sameSite: "lax",
    maxAge: expiresIn,
    httpOnly: false,
  });
}

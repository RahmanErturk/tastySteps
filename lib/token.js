import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export function signToken(payload) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS512",
  });

  return token;
}

export function verifyToken(token) {
  const verifiedPayload = jwt.verify(token, process.env.TOKEN_SECRET, {
    algorithms: ["HS512"],
  });
  return verifiedPayload;
}

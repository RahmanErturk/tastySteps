import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

import recipeRouter from "./routers/recipeRouter.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
// import courseRouter from "./routers/courseRouter.js";
import logMiddleware from "./middlewares/log.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import upload from "./middlewares/uploadMiddleware.js";
// import checkToken from "./middlewares/checkToken.js";

import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

import "./lib/mongoose.js";
import "./lib/auth_google.js";

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "files/frontend", "uploads");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: process.env.DATABASE,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(express.json());

app.use(cookieParser());

app.use(logMiddleware);

app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.post("/api/upload-image", upload.single("image"), async (req, res) => {
  try {
    res.status(200).json({
      fileName: req.file.filename,
      filePath: "/uploads/" + req.file.filename,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/delete-image/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(uploadDir, fileName);
  try {
    await fs.unlink(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.use("/api/courses", courseRouter);
app.use("/", express.static("./files/frontend"));
app.get("/*", (req, res) =>
  res.sendFile(__dirname + "/files/frontend/index.html")
);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => console.log("listening on port: " + port));

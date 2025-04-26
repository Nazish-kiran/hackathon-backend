import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { urlencoded } from "express";
import connectDb from "./db/db.js";
connectDb();
import userRoutes from "./routes/user.routes.js";

import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "https://hackathon-frontend-kohl.vercel.app/", credentials: true }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRoutes);

export default app;

import express, { urlencoded } from "express";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import { APP_ORIGIN, PORT } from "./constants/env.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});

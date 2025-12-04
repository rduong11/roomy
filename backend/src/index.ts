import express, { urlencoded } from "express";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import { APP_ORIGIN, PORT } from "./constants/env.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import { OK } from "./constants/http.js";
import authRoutes from "./routes/auth.route.js";
import authenticate from "./middleware/authenticate.js";
import userRoutes from "./routes/user.routes.js";
import sessionRoutes from "./routes/session.routes.js";

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

app.get("/", (_, res) => {
  return res.status(OK).json({
    status: "healthy",
  });
});

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});

import "dotenv/config";
import env from "../utils/validateEnv.js";

export const PORT = env.PORT;
export const MONGO_URI = env.MONGO_URI;
export const APP_ORIGIN = env.APP_ORIGIN;
export const JWT_SECRET = env.JWT_SECRET;
export const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
export const NODE_ENV = env.NODE_ENV;

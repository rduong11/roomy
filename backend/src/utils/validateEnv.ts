import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  APP_ORIGIN: str(),
  JWT_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  NODE_ENV: str(),
  RESEND_API_KEY: str(),
  EMAIL_SENDER: str(),
});

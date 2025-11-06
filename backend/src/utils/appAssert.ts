import assert from "node:assert";
import AppError from "./AppError";
import type { HttpStatusCode } from "../constants/http";
import type AppErrorCode from "../constants/appErrorCode";

type AppAssert = (
  condition: unknown,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => {
  return assert(condition, new AppError(httpStatusCode, message, appErrorCode));
};

export default appAssert;

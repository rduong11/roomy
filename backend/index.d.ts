import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      userId: UserDocument["_id"];
      sessionId: SessionDocument["_id"];
    }
  }
}

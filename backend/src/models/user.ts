import { model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: false },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  googleId: string;
  credits: number;
}

const userSchema = new Schema<IUser>({
  googleId: String,
  credits: { type: Number, default: 0 },
});

export const User: Model<IUser> = mongoose.model<IUser>("users", userSchema);

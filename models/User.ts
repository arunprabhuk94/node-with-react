import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  googleId: string;
}

const userSchema = new Schema<IUser>({ googleId: String });

export const User: Model<IUser> = mongoose.model<IUser>("users", userSchema);

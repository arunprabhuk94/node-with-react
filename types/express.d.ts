import { IUser } from "../models";

declare global {
  namespace Express {
    // This tells Express that req.user will have the IUser interface
    interface User extends IUser {}
  }
}

export {};
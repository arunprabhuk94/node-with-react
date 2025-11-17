import axios from "axios";
import { type IUser } from "../../../models";

export const getUser = async () => {
  try {
    const response = await axios.get<IUser>("/api/auth/current_user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

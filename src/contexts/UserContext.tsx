import { createContext } from "react";
import type { User } from "../types/user.type";

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

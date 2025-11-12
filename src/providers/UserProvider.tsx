import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user.type";
import { UserContext } from "../contexts/UserContext";

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

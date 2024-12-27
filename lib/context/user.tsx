"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Models } from "appwrite";
import { useActiveAccount } from "thirdweb/react";
import { fetchUsersByAddress } from "../appwrite/user";

interface UserContextProps {
  user: Models.Document | null;
  setUser: (user: Models.Document) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const account = useActiveAccount(); // Always call this at the top level
  const [user, setUser] = useState<Models.Document | null>(null);

  useEffect(() => {
    if (account) {
      const fetchUser = async () => {
        try {
          const user = await fetchUsersByAddress(account.address);
          setUser(user);
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      };

      fetchUser();
    }
  }, [account]);

  // Render children regardless of whether the account exists or not
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Models } from "appwrite";
import { useActiveAccount } from "thirdweb/react";
import { fetchUsersByAddress } from "../appwrite/user";

interface UserContextProps {
  user: Models.Document | null;
  setUser: (user: Models.Document) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const account = useActiveAccount()
  const [user, setUser] = useState<Models.Document | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUsersByAddress(account?.address!);
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

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

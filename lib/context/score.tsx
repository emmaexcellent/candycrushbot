"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { fetchUsersByAddress, updateUserScore } from "../appwrite/user";
import { useActiveAccount } from "thirdweb/react";

interface ScoreContextProps {
  score: number;
  setScore: (score: number) => void;
}

const ScoreContext = createContext<ScoreContextProps | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const account = useActiveAccount();
  const [score, setScoreState] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (account?.address) {
        const user = await fetchUsersByAddress(account.address);
        if (user) {
          setScoreState(user.credit_points);
          setUserId(user.$id); // Store the user ID for updates
        }
      }
    };

    getUser();
  }, [account]);

  const setScore = (newScore: number) => {
    setScoreState(newScore);

    if (userId) {
      updateUserScore(userId, { credit_points: newScore }).catch((error) =>
        console.error("Failed to update score:", error)
      );
    }
  };

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};

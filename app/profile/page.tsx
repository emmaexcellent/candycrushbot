"use client";

import Link from "next/link";
import { User, DollarSign, Wallet, Coins } from "lucide-react";
import {
  TransactionButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
  useReadContract,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "@/lib/thirdweb/client";
import { claimTo, getBalance } from "thirdweb/extensions/erc20";
import { useScore } from "@/lib/context/score";

export default function Profile() {
  const account = useActiveAccount();
  if (!account) {
    throw new Error("No account found");
  }
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const contract = getContract({
    client: client,
    chain: sepolia,
    address: "0x02D6AAD4aac680050dC1BAE284b40deDc0C6C49E",
  });

  const { data: tokenBalance } = useReadContract(getBalance, {
    contract: contract,
    address: account.address,
  });

  const { score, setScore } = useScore();

  // Calculate the maximum tokens claimable based on the user's score
  const calculateClaimableTokens = (score: number) => {
    const tokensPer500Score = 10; // 10 tokens per 500 score
    return Math.floor(score / 500) * tokensPer500Score; // Full multiples of 500 score
  };

  const claimableTokens = calculateClaimableTokens(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-white text-center flex items-center">
        <User className="mr-2" />
        Profile
      </h2>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-white">
          Player Information
        </h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-white">
            <Wallet className="mr-2" />
            <span>
              Wallet Address:{" "}
              {account && (
                <span className="font-bold">
                  {shortenAddress(account.address)}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center text-white">
            <Coins className="mr-2" />
            <span>
              Available Score: <span className="font-bold">{score}</span>
            </span>
          </div>
          <div className="flex items-center text-white">
            <DollarSign className="mr-2" />
            <span>
              Total Points Claimed:{" "}
              <span className="font-bold">{tokenBalance?.displayValue}</span>
            </span>
          </div>
          <div className="flex items-center text-white">
            <DollarSign className="mr-2" />
            <span>
              Claimable Tokens:{" "}
              <span className="font-bold">{claimableTokens}</span>
            </span>
          </div>
        </div>
        {account && (
          <div className="flex justify-between items-center">
            <TransactionButton
              className="!bg-green-500 text-white"
              transaction={() =>
                claimTo({
                  contract: contract,
                  to: account.address,
                  quantity: claimableTokens.toString(),
                })
              }
              onTransactionConfirmed={() => {
                setScore(score - ((claimableTokens/10)*500));
                alert(`Successfully claimed ${claimableTokens} tokens!`);
              }}
              disabled={claimableTokens === 0} // Disable if no claimable tokens
            >
              Claim Tokens
            </TransactionButton>
            <button
              className="bg-red-500 rounded py-1.5 px-3"
              onClick={() => disconnect(wallet!)}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      <Link
        href="/"
        className="mt-8 bg-white text-purple-600 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-colors shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}

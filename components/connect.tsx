"use client"
import { createUser } from "@/lib/appwrite/user";
import { client } from "@/lib/thirdweb/client";
import Link from "next/link";
import { sepolia } from "thirdweb/chains";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { inAppWallet, Wallet } from "thirdweb/wallets";


export function ConnectToCandy() {
  const account = useActiveAccount()

  const createUserDb = async (wallet: Wallet) => {
    const account = wallet.getAccount();
    if (!account) {
      return;
    } else {
      await createUser(account.address);
    }    
  }

  return (
    <>
      {!account ? (
        <ConnectButton
          client={client}
          accountAbstraction={{
            chain: sepolia,
            sponsorGas: true,
          }}
          wallets={[
            inAppWallet({
              auth: {
                options: ["phone"],
              },
            }),
          ]}
          connectModal={{
            title: "Sign in to CandyCrush Token",
            size: "compact",
          }}
          onConnect={async (wallet) => {       
            await createUserDb(wallet);
          }}
        />
      ) : (
        <Link href="/profile">
          <p className="rounded py-2 px-3 bg-gray-600">
            {shortenAddress(account.address)}
          </p>
        </Link>
      )}
    </>
  );
}

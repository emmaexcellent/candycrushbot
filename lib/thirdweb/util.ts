"use server"

import { sepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb/client";

 

export async function ConnectToCandyUtil() {
  const wallet = inAppWallet({
    smartAccount: {
      chain: sepolia,
      sponsorGas: true,
    },
  });

  const account = await wallet.connect({
    client,
    strategy: "google",
  });
  return account;
}

import { useState } from "react";

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      // Check if the user has a wallet installed
      if (window.ethereum) {
        // Request access to the user's wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWallet({ address });
        setConnected(true);
      } else {
        throw new Error("No wallet detected");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return { wallet, connected, connectWallet };
};


import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Custom hook for interacting with Ethereum using ethers.js
export const useEthereum = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    // Create a new ethers.js provider
    const createProvider = async () => {
      const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/3f0c8a84d8154101b2194cce04ece15e');
      setProvider(provider);
      setSigner(provider.getSigner())
    };

    createProvider();
  }, []);

  return { provider, signer };
};


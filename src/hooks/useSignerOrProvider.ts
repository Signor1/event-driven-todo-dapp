import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Signer, Provider, Eip1193Provider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { readOnlyProvider } from "../config/readOnlyProvider";

const useSignerOrProvider = () => {
  const [signer, setSigner] = useState<Signer | null>(null);
  const { walletProvider } = useAppKitProvider("eip155");

  const provider = useMemo(() => {
    if (!walletProvider) return null;
    return new BrowserProvider(walletProvider as unknown as Eip1193Provider);
  }, [walletProvider]);

  useEffect(() => {
    if (!provider) {
      setSigner(null);
      return;
    }

    const updateSigner = async () => {
      try {
        const newSigner = await provider.getSigner();
        const newAddress = await newSigner.getAddress();

        if (!signer) {
          setSigner(newSigner);
          return;
        }

        const currentAddress = await signer.getAddress();
        if (newAddress !== currentAddress) {
          setSigner(newSigner);
        }
      } catch (error) {
        console.error("Error updating signer:", error);
        setSigner(null);
      }
    };

    updateSigner();
  }, [provider, signer]);

  return {
    signer,
    provider,
    readOnlyProvider: readOnlyProvider as Provider,
  };
};

export default useSignerOrProvider;

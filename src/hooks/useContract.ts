import { useMemo } from "react";
import { Contract } from "ethers";
import ABI from "../abi/todo.json";
import useSignerOrProvider from "./useSignerOrProvider";

const useContract = (withSigner = false) => {
  const { signer, readOnlyProvider } = useSignerOrProvider();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(import.meta.env.VITE_CONTRACT_ADDRESS, ABI, signer);
    }

    return new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      ABI,
      readOnlyProvider
    );
  }, [signer, readOnlyProvider, withSigner]);
};

export default useContract;

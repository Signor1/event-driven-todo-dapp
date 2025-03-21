import { useCallback } from "react";
import useContract from "./useContract";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";

const useCreateTodo = () => {
  const contract = useContract(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (title: string, description: string) => {
      if (!title || !description) {
        toast.error("Title and description are required");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(baseSepolia.id)) {
        toast.error("You're not connected to baseSepolia");
        return;
      }

      try {
        const estimatedGas = await contract.createTodo.estimateGas(
          title,
          description
        );

        const tx = await contract.createTodo(title, description, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Todo created successfully");
          return;
        }

        toast.error("Failed to create todo");
        return;
      } catch (err) {
        const errorDecoder = ErrorDecoder.create();
        const { reason } = await errorDecoder.decode(err);
        toast.error(reason);
      }
    },
    [contract, address, chainId]
  );
};

export default useCreateTodo;

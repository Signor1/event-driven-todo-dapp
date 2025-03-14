import { AppEvent, CustomWindowEventMap, useAppEvent } from "./useAppEvent";
import { useMemo, type Dispatch } from "react";
import { useEffect } from "react";
import { Contract } from "ethers";
import ABI from "../../abi/todo.json";
import { readOnlyProvider } from "../../config/readOnlyProvider";

// Extend our CustomWindowEventMap to include contract events
interface ContractEventMap extends CustomWindowEventMap {
  TodoCreated: AppEvent<{ title: string; description: string; status: number }>;
  TodoUpdated: AppEvent<{
    index: number;
    title: string;
    description: string;
    status: number;
  }>;
  TodoCompleted: AppEvent<{ index: number; status: number }>;
  TodoDeleted: AppEvent<{ index: number }>;
}

// Create a specialized version of our hook for contract events
export const useContractEvent = <PayloadType = unknown>(
  eventName: keyof ContractEventMap,
  callback?: Dispatch<PayloadType> | VoidFunction
) => {
  return useAppEvent(eventName as never, callback);
};

/**
 * Sets up listeners for contract events and dispatches app events when a contract
 * event is emitted. This hook is used to keep the state of the app up to date
 * with the state of the contract.
 *
 * Currently, the events that are listened to are:
 *
 * - `TodoCreated(title, description, status)`
 * - `TodoUpdated(index, title, description, status)`
 * - `TodoCompleted(index, status)`
 * - `TodoDeleted(index)`
 *
 * When a contract event is emitted, the corresponding app event is dispatched
 * with the same payload.
 */
const useContractEvents = () => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // Memoize contract instance to reuse across re-renders
  const contract = useMemo(() => {
    return new Contract(contractAddress, ABI, readOnlyProvider);
  }, [contractAddress]);

  // Get dispatch functions for each contract event
  const { dispatch: dispatchTodoCreated } = useContractEvent("TodoCreated");
  const { dispatch: dispatchTodoUpdated } = useContractEvent("TodoUpdated");
  const { dispatch: dispatchTodoCompleted } = useContractEvent("TodoCompleted");
  const { dispatch: dispatchTodoDeleted } = useContractEvent("TodoDeleted");

  useEffect(() => {
    // Set up listeners for each contract event
    contract.on(
      "TodoCreated",
      (title: string, description: string, status: number) => {
        dispatchTodoCreated({ title, description, status });
      }
    );

    contract.on(
      "TodoUpdated",
      (index: number, title: string, description: string, status: number) => {
        dispatchTodoUpdated({ index, title, description, status });
      }
    );

    contract.on("TodoCompleted", (index: number, status: number) => {
      dispatchTodoCompleted({ index, status });
    });

    contract.on("TodoDeleted", (index: number) => {
      dispatchTodoDeleted({ index });
    });

    // Clean up listeners when component unmounts
    return () => {
      contract.removeAllListeners();
    };
  }, [
    contract,
    dispatchTodoCreated,
    dispatchTodoUpdated,
    dispatchTodoCompleted,
    dispatchTodoDeleted,
  ]);
};

export default useContractEvents;

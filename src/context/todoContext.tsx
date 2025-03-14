import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useContractEvents, { useContractEvent } from "../hooks/events/useContractEvents";
import useContract from "../hooks/useContract";

// Define Todo interface
interface Todo {
    title: string;
    description: string;
    status: string;
}

// Define context type
interface TodoContextType {
    todos: Todo[];
}

// Create properly typed context
const TodoContext = createContext<TodoContextType>({
    todos: []
});

/**
 * Provides a context and manages the state for todos in the application.
 * 
 * This component sets up event listeners for todo-related actions,
 * such as creation, updating, completion, and deletion, and updates
 * the todos state accordingly based on contract events.
 *
 * It fetches initial todo data from the read-only contract and formats
 * the status of each todo item using the `formatEnum` function.
 *
 * The context value contains the todos state, which is an array of todo
 * objects, each with a title, description, and status.
 *
 * @param {object} props - The props for the provider.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 */

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const readOnlyTodoContract = useContract();

    // Start listening to contract events
    useContractEvents();


    const formatEnum = useCallback((value: number): string => {
        const status = Number(value);
        switch (status) {
            case 1: return "Created";
            case 2: return "Edited";
            case 3: return "Completed";
            default: return "Pending";
        }
    }, []);

    const getTodos = useCallback(async () => {
        if (!readOnlyTodoContract) return;

        try {
            const data = await readOnlyTodoContract.getAllTodo();
            const formattedTodos = data.map((todo: { title: string; description: string; status: number }) => ({
                title: todo.title,
                description: todo.description,
                status: formatEnum(todo.status)
            }))
            console.log("Todo fetched from getTodos");
            setTodos(formattedTodos);
        } catch (error) {
            console.log("Error fetching todos", error);
        }
    }, [readOnlyTodoContract, formatEnum]);

    useEffect(() => {
        getTodos();
    }, [getTodos])


    // Define types for each event payload
    type TodoCreatedPayload = {
        title: string;
        description: string;
        status: number;
    };

    type TodoUpdatedPayload = {
        index: number;
        title: string;
        description: string;
        status: number;
    };

    type TodoCompletedPayload = {
        index: number;
        status: number;
    };

    type TodoDeletedPayload = {
        index: number;
    };


    // Listen for TodoCreated events
    useContractEvent<TodoCreatedPayload>("TodoCreated", (payload) => {
        setTodos((prevState) => [...prevState, {
            title: payload.title,
            description: payload.description,
            status: formatEnum(payload.status),
        }]);
    });



    // Listen for TodoUpdated events
    useContractEvent<TodoUpdatedPayload>("TodoUpdated", (payload) => {
        setTodos((prevState) => {
            const updatedTodos = [...prevState];
            updatedTodos[Number(payload.index)] = {
                title: payload.title,
                description: payload.description,
                status: formatEnum(payload.status),
            };
            return updatedTodos;
        });
    });


    // Listen for TodoCompleted events
    useContractEvent<TodoCompletedPayload>("TodoCompleted", (payload) => {
        setTodos((prevState) => {
            const updatedTodos = [...prevState];
            updatedTodos[Number(payload.index)] = {
                ...updatedTodos[Number(payload.index)],
                status: formatEnum(payload.status),
            };
            return updatedTodos;
        });
    });


    // Listen for TodoDeleted events
    useContractEvent<TodoDeletedPayload>("TodoDeleted", (payload) => {
        setTodos((prevState) => {
            const updatedTodos = [...prevState];
            updatedTodos.splice(Number(payload.index), 1);
            return updatedTodos;
        });
    });

    return (
        <TodoContext.Provider value={{ todos }}>
            {children}
        </TodoContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => {
    const context = useContext(TodoContext);
    return context;
}


export default TodoContextProvider;
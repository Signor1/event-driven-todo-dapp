import { Text } from "@radix-ui/themes"
import { useTodo } from "../context/todoContext"
import Todo from "./Todo"
import useTheme from "../hooks/events/useTheme"

export type TodoType = {
    title: string,
    description: string,
    status: string
}

/**
 * Component that renders a list of todos.
 *
 * Fetches the todos state from the TodoContext and renders each todo as a Todo component.
 * If there are no todos, it renders a message to the user.
 *
 * @returns JSX.Element
 */
const Todos = () => {
    const { todos } = useTodo();

    const { theme } = useTheme();

    const textColor = theme === "dark" ? "text-stone-200" : "text-stone-800";

    return (
        <div className="w-full flex flex-col gap-4">
            <Text as="p" className="text-3xl font-semibold text-amber-600">My Todos</Text>
            <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-4">
                {
                    todos.length === 0 ?
                        <Text as="p" className={`text-2xl font-medium ${textColor}`}>
                            There are no available todos</Text> :
                        todos.map((todo: TodoType, index: number) => (
                            <Todo key={index} todo={todo} index={index} />
                        ))
                }
            </section>
        </div>
    )
}

export default Todos
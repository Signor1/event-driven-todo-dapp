
import { AlertDialog, Box, Button, Card, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import { useState } from "react";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useCompleteTodo from "../hooks/useCompleteTodo";
import { TodoType } from "./Todos";
import useTheme from "../hooks/events/useTheme";


/**
 * A single todo item component
 * 
 * Displays the title, description, and status of a todo item.
 * Provides buttons to delete, edit, and complete a todo item.
 * 
 * @param {TodoType} todo - The todo item to be displayed
 * @param {number} index - The index of the todo item to be displayed
 * @returns {JSX.Element} A single todo item component
 */
const Todo = ({ todo, index }: { todo: TodoType, index: number }) => {

    const handleTodoEdit = useUpdateTodo();
    const handleDeleteTodo = useDeleteTodo();
    const handleTodoCompleted = useCompleteTodo();

    const { title, description, status } = todo;

    const [newFields, setNewFields] = useState({
        newtitle: title || "",
        newdescription: description || "",
    })

    /**
     * @param {keyof typeof newFields} name
     * @param {{ target: { value: string } }} e
     * @returns {void}
     */
    const handleChange = (name: keyof typeof newFields, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewFields((prevState: typeof newFields) => ({ ...prevState, [name]: e.target.value }));
    }
    const { newtitle, newdescription } = newFields;

    /**
     * Method for updating todo
     * @param {number} index - The index of the todo to be updated
     * @returns {void}
     */
    const handleUpdate = (index: number): void => {
        handleTodoEdit(index, newtitle, newdescription);
        setNewFields({
            newtitle,
            newdescription,
        })
    }

    /**
     * Method for deleting a todo
     * @param {number} index - The index of the todo to be deleted
     * @returns {void}
     */
    const handleDelete = (index: number): void => {
        handleDeleteTodo(index);
    }

    /**
     * Method for completing a todo
     * @param {number} index - The index of the todo to be completed
     * @returns {void}
     */
    const handleDone = (index: number): void => {
        handleTodoCompleted(index);
    }

    const { theme } = useTheme();

    const cardBgColor = theme === "dark" ? "bg-stone-800" : "bg-stone-100";
    const textColor = theme === "dark" ? "text-white" : "text-stone-800";
    const textSecondaryColor = theme === "dark" ? "text-stone-300" : "text-stone-600";

    return (
        <Box className="w-full">
            <Card variant="surface" className={cardBgColor}>
                <Flex direction={"column"} gap={"2"}>
                    <Text as="div" size="2" weight="bold" className={textColor}>
                        Title
                    </Text>
                    <Text as="div" color="gray" size="2" className={textSecondaryColor}>
                        {title}
                    </Text>
                    <Text as="div" size="2" weight="bold" className={textColor}>
                        Description
                    </Text>
                    <Text as="div" color="gray" size="2" className={textSecondaryColor}>
                        {description}
                    </Text>
                    <Text as="div" size="2" weight="bold" className={textColor}>
                        Status
                    </Text>
                    <Text as="div" color="gray" size="2" className={textSecondaryColor}>
                        {status}
                    </Text>
                </Flex>

                <div className="w-full flex justify-start mt-4 items-center gap-4">
                    {/* Delete Alert */}
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button color="red">Delete</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px" className={theme === "dark" ? "bg-stone-800" : "bg-white"}>
                            <AlertDialog.Title className={textColor}>Delete Todo</AlertDialog.Title>
                            <AlertDialog.Description size="2" className={textSecondaryColor}>
                                Are you sure? If you delete this todo, you will not be able to recover it.
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button onClick={() => handleDelete(index)} variant="solid" color="red">
                                        Delete
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>

                    {/* Update todo inputs */}
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button color="orange">Edit</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px" className={theme === "dark" ? "bg-stone-800" : "bg-white"}>
                            <Dialog.Title className={textColor}>Edit Todo</Dialog.Title>
                            <Dialog.Description size="2" mb="4" className={textSecondaryColor}>
                                Edit Your Todo Here.
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold" className={textColor}>
                                        Todo Title
                                    </Text>
                                    <TextField.Root
                                        placeholder="Enter title"
                                        value={newtitle}
                                        onChange={(e) => handleChange("newtitle", e)}
                                        className={theme === "dark" ? "bg-stone-700" : "bg-white"}
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold" className={textColor}>
                                        Todo Description
                                    </Text>
                                    <TextArea
                                        placeholder="Enter description"
                                        value={newdescription}
                                        onChange={(e) => handleChange("newdescription", e)}
                                        className={theme === "dark" ? "bg-stone-700" : "bg-white"}
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button onClick={() => handleUpdate(index)}>Update</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>

                    {/* Complete Alert */}
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button color="green">Done</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px" className={theme === "dark" ? "bg-stone-800" : "bg-white"}>
                            <AlertDialog.Title className={textColor}>Completed Todo</AlertDialog.Title>
                            <AlertDialog.Description size="2" className={textSecondaryColor}>
                                Are you sure you&apos;ve completed this task?
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button onClick={() => handleDone(index)} variant="solid" color="green">
                                        Yes, I have
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </div>
            </Card>
        </Box>
    )
}

export default Todo

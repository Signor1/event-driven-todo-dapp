import { Dialog, Button, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import { useState } from "react"
import useCreateTodo from "../hooks/useCreateTodo";

/**
 * Creates a modal for creating a new Todo.
 * @returns JSX.Element
 */
const CreateTodoModal = () => {
    const handleCreateNewTodo = useCreateTodo();

    const [fields, setFields] = useState({
        title: "",
        description: "",
    });

    /**
     * @param {keyof typeof fields} name
     * @param {{ target: { value: string } }} e
     */
    const handleChange = (name: keyof typeof fields, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFields((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const { title, description } = fields;

    /**
     * @param {string} title
     * @param {string} description
     */
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>, title: string, description: string) => {
        event.preventDefault();
        handleCreateNewTodo(title, description);
        setFields({ title: "", description: "" });
    }

    return (
        <div className="w-full flex justify-end">
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button color="orange">Create Todo</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>New Todo</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Create A New Todo Here.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Todo Title
                            </Text>
                            <TextField.Root
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => handleChange("title", e)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Todo Description
                            </Text>
                            <TextArea placeholder="Enter description"
                                value={description}
                                onChange={(e) => handleChange("description", e)} />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={(event) => handleSubmit(event, title, description)}>Submit</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    )
}

export default CreateTodoModal
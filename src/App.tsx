import "./config/connection"
import Layouts from "./components/Layouts"
import CreateTodoModal from "./components/CreateTodoModal"
import Todos from "./components/Todos"
import { Theme } from "@radix-ui/themes";
import useTheme from "./hooks/events/useTheme";
import "@radix-ui/themes/styles.css";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <Theme appearance={theme}>
      {children}
    </Theme>
  );
};

function App() {

  return (
    <ThemeProvider>
      <Layouts>
        <CreateTodoModal />
        <Todos />
      </Layouts>
    </ThemeProvider>
  )
}

export default App
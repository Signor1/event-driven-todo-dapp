import useTheme from "../hooks/events/useTheme";


const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors"
        >
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
    );
};

export default ThemeToggler;
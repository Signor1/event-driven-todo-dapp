import useTheme from "../hooks/events/useTheme";


const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`w-9 h-9 flex justify-center items-center rounded-full border ${theme === "dark" ? "border-stone-400" : "border-stone-300"} bg-transparent transition-colors`}
        >
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    );
};

export default ThemeToggler;
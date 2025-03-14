// components/Layouts.tsx
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ThemeToggler from "../util/ThemeToggler";
import useTheme from "../hooks/events/useTheme";

/**
 * Layouts component serves as a structured wrapper for the application,
 * providing a consistent layout with a header, main content area, and footer.
 * It applies styling for full-screen height, flexbox for layout distribution,
 * and responds to theme changes. A ToastContainer for notifications is included
 * at the top-right of the screen.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed within
 * the main section of the layout.
 * @returns {JSX.Element} - The rendered layout component.
 */
const Layouts = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {

    const { theme } = useTheme();

    // Determine background and text colors based on theme
    const bgColor = theme === "dark" ? "bg-stone-950" : "bg-stone-100";
    const textColor = theme === "dark" ? "text-stone-300" : "text-stone-800";
    const headerBgColor = theme === "dark" ? "bg-stone-950" : "bg-stone-200";
    const headerBorderColor = theme === "dark" ? "border-stone-400" : "border-stone-300";
    const footerBgColor = theme === "dark" ? "bg-stone-800" : "bg-stone-300";

    return (
        <main className={`w-full min-h-screen flex flex-col justify-between ${bgColor} transition-colors duration-300`}>
            {/* header */}
            <div className={`w-full h-20 flex justify-between items-center px-4 border-b ${headerBorderColor} ${headerBgColor} rounded-e-lg transition-colors duration-300`}>
                <h3 className="text-lg font-medium text-amber-600">Todo Dapp</h3>

                <div className="flex items-center gap-6">
                    <ThemeToggler />
                    <appkit-button />
                </div>
            </div>
            <section className={`flex-1 p-8 ${textColor} transition-colors duration-300`}>
                {children}
            </section>
            {/* Footer */}
            <footer className={`w-full h-20 flex justify-center items-center ${footerBgColor} transition-colors duration-300`}>
                <p className={textColor}>Todo Dapp &copy; 2025. All Right Reserved.</p>
            </footer>
            <ToastContainer theme={theme as "dark" | "light"} position="top-right" />
        </main>
    );
};

export default Layouts;
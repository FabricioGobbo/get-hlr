import { Moon, Sun, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 glass glass-border backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="glass glass-border rounded-full p-2 bg-gradient-to-br from-blue-500 to-purple-500">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold tracking-tighter text-lg">TelecomStatus</h1>
            <p className="text-xs text-muted-foreground tracking-tight">Sistema de Consulta</p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="glass glass-border rounded-full p-2.5 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

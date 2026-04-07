import { useTheme } from "../contexts/ThemeContext";
import { MarketingNavbar } from "./MarketingNavbar";
import { MarketingFooter } from "./MarketingFooter";

function MarketingLayout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`relative min-h-screen fm-page ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-40 -right-24 h-96 w-96 rounded-full blur-3xl ${
            theme === "dark" ? "bg-emerald-500/20" : "bg-emerald-300/40"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 h-80 w-80 rounded-full blur-3xl ${
            theme === "dark" ? "bg-amber-400/20" : "bg-amber-300/40"
          }`}
        />
        <div className="absolute inset-0 fm-grid opacity-30" />
      </div>

      <MarketingNavbar />

      <main className="relative z-10 pt-24 pb-16">
        {children}
      </main>

      <MarketingFooter />
    </div>
  );
}

export { MarketingLayout };

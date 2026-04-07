import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sprout } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./CinematicComponents";
import { useTheme } from "../contexts/ThemeContext";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "Community", to: "/community" },
  { label: "Help", to: "/help" }
];

function MarketingNavbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
            : "bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              className={`p-2.5 rounded-xl ${
                scrolled
                  ? theme === "dark"
                    ? "bg-emerald-500/20"
                    : "bg-emerald-100"
                  : "bg-white/10"
              }`}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Sprout
                className={`w-6 h-6 ${
                  scrolled ? "text-emerald-500" : "text-white"
                }`}
              />
            </motion.div>
            <div>
              <p
                className={`text-xl font-black ${
                  scrolled
                    ? theme === "dark"
                      ? "text-white"
                      : "text-slate-900"
                    : "text-white"
                }`}
              >
                FarmMarket
              </p>
              <p
                className={`text-xs tracking-wider uppercase ${
                  scrolled
                    ? theme === "dark"
                      ? "text-slate-400"
                      : "text-slate-500"
                    : "text-white/60"
                }`}
              >
                Harvest to Home
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.to ||
                location.pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-semibold transition-colors ${
                    scrolled
                      ? theme === "dark"
                        ? isActive
                          ? "text-emerald-400"
                          : "text-slate-300 hover:text-white"
                        : isActive
                        ? "text-emerald-600"
                        : "text-slate-600 hover:text-slate-900"
                      : isActive
                      ? "text-emerald-300"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} inline={true} />
            <Link to="/login">
              <Button
                variant="ghost"
                className={`rounded-xl font-semibold ${
                  scrolled
                    ? theme === "dark"
                      ? "text-white hover:bg-slate-800"
                      : "text-slate-900 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export { MarketingNavbar };

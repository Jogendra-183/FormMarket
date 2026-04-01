import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/CinematicComponents";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  TrendingUp,
  Users,
  X,
  Sprout
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavItems = () => {
    if (user?.role === "farmer") {
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/farmer/dashboard" },
        { icon: Package, label: "Products", path: "/farmer/products" },
        { icon: ShoppingCart, label: "Orders", path: "/farmer/orders" },
        { icon: TrendingUp, label: "Analytics", path: "/farmer/analytics" },
        { icon: BookOpen, label: "Learning Hub", path: "/farmer/learning" },
        { icon: MessageSquare, label: "Community", path: "/community" }
      ];
    }
    if (user?.role === "buyer") {
      return [
        { icon: Home, label: "Browse", path: "/buyer/browse" },
        { icon: ShoppingCart, label: "Cart", path: "/buyer/cart" },
        { icon: FileText, label: "My Orders", path: "/buyer/orders" },
        { icon: CreditCard, label: "Subscription", path: "/buyer/subscription" },
        { icon: MessageSquare, label: "Community", path: "/community" }
      ];
    }
    if (user?.role === "admin") {
      return [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
        { icon: Users, label: "Users", path: "/admin/users" },
        { icon: Package, label: "Products", path: "/admin/products" },
        { icon: TrendingUp, label: "Analytics", path: "/admin/analytics" },
        { icon: Shield, label: "Content", path: "/admin/content" }
      ];
    }
    return [];
  };

  const getPrimaryAction = () => {
    if (user?.role === "farmer") {
      return { label: "New Listing", path: "/farmer/products", icon: Plus };
    }
    if (user?.role === "buyer") {
      return { label: "My Cart", path: "/buyer/cart", icon: ShoppingCart };
    }
    if (user?.role === "admin") {
      return { label: "Review Queue", path: "/admin/products", icon: Shield };
    }
    return null;
  };

  const navItems = getNavItems();
  const primaryAction = getPrimaryAction();
  const ActionIcon = primaryAction?.icon;

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Fixed Theme Toggle */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all ${
        theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'
      }`}>
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Link to="/" className="flex items-center gap-3">
              <motion.div 
                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Sprout className="h-6 w-6" />
              </motion.div>
              <div>
                <p className="text-lg font-black">FarmMarket</p>
                <p className="text-xs opacity-60 tracking-wider">Harvest Hub</p>
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
              <Input
                placeholder="Search products, orders, farmers..."
                className={`pl-10 rounded-xl backdrop-blur-xl border transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {primaryAction && (
              <Link to={primaryAction.path} className="hidden sm:inline-flex">
                <Button magnetic size="lg" className="rounded-2xl">
                  {ActionIcon && <ActionIcon className="h-4 w-4" />}
                  {primaryAction.label}
                </Button>
              </Link>
            )}
            
            <Link to={`/${user?.role}/notifications`}>
              <Button variant="ghost" size="icon" className="relative rounded-xl">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600 text-white">
                  3
                </Badge>
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-2xl">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                    theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
                  }`}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-bold">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 backdrop-blur-xl border-r z-30 transition-all ${
                theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'
              }`}
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 rounded-2xl font-bold ${
                          isActive ? 'bg-indigo-600 text-white' : ''
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;

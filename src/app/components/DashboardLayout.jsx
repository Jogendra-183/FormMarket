import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
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
  Sprout,
  User,
  HelpCircle,
  Lock,
  Bell as BellIcon,
  Palette,
  Globe
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
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

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

  const getRoleColor = () => {
    switch (user?.role) {
      case 'farmer': return 'bg-emerald-600';
      case 'buyer': return 'bg-indigo-600';
      case 'admin': return 'bg-purple-600';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Fixed Theme Toggle */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      {/* Header */}
      <motion.header 
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all ${
          theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <AnimatePresence mode="wait">
                  {sidebarOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            
            <Link to="/" className="flex items-center gap-3">
              <motion.div 
                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
              >
                <Sprout className="h-6 w-6" />
              </motion.div>
              <div>
                <motion.p 
                  className="text-lg font-black"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  FarmMarket
                </motion.p>
                <motion.p 
                  className="text-xs opacity-60 tracking-wider"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Harvest Hub
                </motion.p>
              </div>
            </Link>
          </div>

          <motion.div 
            className="flex-1 max-w-xl mx-4 hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: searchFocused ? 1.02 : 1,
                  opacity: searchFocused ? 1 : 0.6
                }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              </motion.div>
              <Input
                placeholder="Search products, orders, farmers..."
                className={`pl-10 rounded-xl backdrop-blur-xl border transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/15' 
                    : 'bg-black/5 border-black/10 hover:bg-black/10 focus:bg-black/15'
                } ${searchFocused ? 'ring-2 ring-primary/50' : ''}`}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            {/* Cart Button for Buyers */}
            {user?.role === 'buyer' && (
              <Link to="/buyer/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon" className="relative rounded-xl">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emerald-600 text-white text-xs">
                          {itemCount > 99 ? '99+' : itemCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </Link>
            )}

            {primaryAction && user?.role !== 'buyer' && (
              <Link to={primaryAction.path} className="hidden sm:inline-flex">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button magnetic size="lg" className="rounded-2xl">
                    {ActionIcon && <ActionIcon className="h-4 w-4" />}
                    {primaryAction.label}
                  </Button>
                </motion.div>
              </Link>
            )}
            
            <Link to={`/${user?.role}/notifications`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="relative rounded-xl">
                  <Bell className="h-5 w-5" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-600 text-white animate-pulse">
                      3
                    </Badge>
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="ghost" className="flex items-center gap-2 rounded-2xl">
                    <motion.div 
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
                      }`}
                      whileHover={{ rotate: 5 }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </motion.div>
                    <span className="hidden sm:inline font-bold">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate(`/${user?.role}/profile`)}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate(`/${user?.role}/account`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate(`/${user?.role}/preferences`)}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate(`/${user?.role}/notifications-settings`)}
                >
                  <BellIcon className="h-4 w-4 mr-2" />
                  Notification Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate(`/${user?.role}/privacy`)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Privacy & Security
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate(`/${user?.role}/help`)}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg cursor-pointer"
                  onClick={() => navigate('/about')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  About FarmMarket
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 backdrop-blur-xl border-r z-30 transition-all ${
                theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'
              }`}
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={item.path}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start gap-3 rounded-2xl font-bold relative overflow-hidden ${
                              isActive ? `${getRoleColor()} text-white` : ''
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                layoutId="activeNavBg"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <motion.div
                              animate={{ rotate: isActive ? [0, -10, 10, 0] : 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="h-5 w-5" />
                            </motion.div>
                            {item.label}
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              
              {/* Sidebar Footer */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className={`p-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                }`}>
                  <p className="text-xs opacity-60 mb-1">Logged in as</p>
                  <p className="font-bold text-sm">{user?.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-73px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default DashboardLayout;

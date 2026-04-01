import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
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
  X
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
import { ThemeSwitcher } from "./ThemeSwitcher";
import { 
  AnimatedPage, 
  StaggerContainer, 
  StaggerItem, 
  SlideIn,
  FadeIn,
  HoverLift 
} from "./AnimationWrappers";

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
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
    <div className="min-h-screen fm-page text-foreground">
      <FadeIn>
        <header className="sticky top-0 z-40">
          <div className="fm-panel border-b border-black/5">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
              <StaggerContainer staggerDelay={0.05} className="flex items-center gap-4">
                <StaggerItem>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <Link to="/" className="flex items-center gap-2">
                    <motion.div 
                      className="bg-primary p-2 rounded-xl shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Package className="h-5 w-5 text-primary-foreground" />
                    </motion.div>
                    <div className="leading-tight">
                      <span className="text-lg font-semibold">FarmMarket</span>
                      <span className="block text-xs text-muted-foreground">Harvest Hub</span>
                    </div>
                  </Link>
                </StaggerItem>
              </StaggerContainer>

              <SlideIn direction="down" delay={0.2}>
                <div className="flex-1 max-w-xl mx-4 hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products, orders, farmers..."
                      className="pl-10 focus-glow transition-all duration-300"
                    />
                  </div>
                </div>
              </SlideIn>

              <StaggerContainer staggerDelay={0.05} className="flex items-center gap-2">
                {primaryAction && (
                  <StaggerItem>
                    <Link to={primaryAction.path} className="hidden sm:inline-flex">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="sm">
                          {ActionIcon && <ActionIcon className="h-4 w-4" />}
                          {primaryAction.label}
                        </Button>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                )}
                <StaggerItem>
                  <ThemeSwitcher />
                </StaggerItem>
                <StaggerItem>
                  <Link to={`/${user?.role}/notifications`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="ghost" size="icon" className="relative">
                        <motion.div
                          animate={{ 
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.1, 1] 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 5 
                          }}
                        >
                          <Bell className="h-5 w-5" />
                        </motion.div>
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-foreground text-background animate-pulse-slow">
                          3
                        </Badge>
                      </Button>
                    </motion.div>
                  </Link>
                </StaggerItem>
                <StaggerItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="ghost" className="flex items-center gap-2">
                          <motion.div 
                            className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                            whileHover={{ scale: 1.1 }}
                          >
                            {user?.name?.charAt(0).toUpperCase()}
                          </motion.div>
                          <span className="hidden sm:inline">{user?.name}</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="hover-lift">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="hover-lift">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </header>
      </FadeIn>

      <div className="flex">
        <AnimatePresence>
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ 
              x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -300,
              opacity: sidebarOpen || window.innerWidth >= 1024 ? 1 : 0
            }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
              fixed lg:sticky top-[72px] left-0 h-[calc(100vh-72px)] w-72 z-30
            `}
          >
            <div className="h-full p-4">
              <motion.div 
                className="fm-panel h-full rounded-2xl p-4 flex flex-col"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <StaggerContainer staggerDelay={0.05}>
                  <nav className="space-y-2">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <StaggerItem key={item.path}>
                          <HoverLift liftAmount={-2}>
                            <Link
                              to={item.path}
                              onClick={() => setSidebarOpen(false)}
                              className={`
                                flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300
                                ${
                                  isActive
                                    ? "bg-[rgba(31,91,59,0.12)] text-primary shadow-[inset_0_0_0_1px_rgba(31,91,59,0.12)]"
                                    : "text-foreground/70 hover:bg-white/70"
                                }
                              `}
                            >
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Icon className="h-5 w-5" />
                              </motion.div>
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          </HoverLift>
                        </StaggerItem>
                      );
                    })}
                  </nav>
                </StaggerContainer>
                <motion.div 
                  className="mt-auto rounded-2xl border border-black/5 bg-white/60 p-4 hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Market Pulse
                  </p>
                  <p className="mt-2 text-sm text-foreground/80">
                    Local demand is up 12% this week. Keep listings stocked.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="ghost" size="sm" className="mt-3 w-full">
                      View Insights
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.aside>
        </AnimatePresence>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <motion.main 
          className="flex-1 px-4 pb-10 pt-6 lg:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatedPage>
            {children}
          </AnimatedPage>
        </motion.main>
        </main>
      </div>
    </div>
  );
}

export { DashboardLayout };

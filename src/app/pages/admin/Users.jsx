import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  HoverLift,
  SlideIn
} from "../../components/AnimationWrappers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Search, UserCheck, UserX, Mail, MoreVertical, Users, Shield, Clock, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { users as mockUsers } from "../../utils/mockData";
import { toast } from "sonner";
import { userApi } from "../../utils/api";
import { Loader2 } from "lucide-react";

function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userApi.getAllUsers();
      if (Array.isArray(data)) {
        setAllUsers(data);
      } else if (data && Array.isArray(data.content)) {
        setAllUsers(data.content);
      } else {
        setAllUsers(mockUsers);
      }
    } catch (error) {
      console.error("Fetch all users failed:", error);
      toast.error("Could not reach backend. Using cached users.");
      setAllUsers([
        ...mockUsers,
        ...mockUsers.map((u, i) => ({ ...u, id: `${i + 4}`, name: `User ${i + 4}` }))
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleApprove = async (userId, userName) => {
    try {
      await userApi.toggleUserStatus(userId);
      toast.success(`${userName} status updated successfully`, {
        description: "The user's access has been modified."
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Could not update status. Offline fallback.");
      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    }
  };
  
  const handleSuspend = handleApprove;
  
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "suspended":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const filterUsers = (role) => {
    let filtered = allUsers;
    if (role && role !== "all") {
      filtered = filtered.filter((user) => {
        return (user.role || "").toLowerCase() === role.toLowerCase() || 
               (user.authorities && user.authorities.some(a => a.authority.toLowerCase().includes(role.toLowerCase())));
      });
    }
    if (searchQuery) {
      filtered = filtered.filter((user) => 
        (user.name || user.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => {
          let s = user.status || (user.enabled !== false ? "active" : "suspended");
          return s.toLowerCase() === statusFilter.toLowerCase();
      });
    }
    return filtered;
  };

  const stats = [
    { title: "Total Users", value: allUsers.length, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Farmers", value: filterUsers("farmer").length, icon: Shield, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { title: "Buyers", value: filterUsers("buyer").length, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { title: "Pending", value: allUsers.filter((u) => u.status === "pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" }
  ];
  
  const UserTable = ({ users: userList }) => (
    <StaggerContainer className="space-y-3" staggerDelay={0.05}>
      <AnimatePresence>
        {userList.map((user, index) => (
          <StaggerItem key={user.id}>
            <motion.div
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div
                        className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center font-semibold text-primary relative overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-primary/10"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 2, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{(user.name || user.username || "?").charAt(0).toUpperCase()}</span>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <motion.h3 
                            className="font-semibold truncate"
                            whileHover={{ color: 'var(--primary)' }}
                          >
                            {user.name || user.username || "Unknown"}
                          </motion.h3>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.03, type: "spring" }}
                          >
                            <Badge className={`${getStatusColor(user.status || (user.enabled !== false ? "active" : "suspended"))} transition-all`}>
                              {user.status || (user.enabled !== false ? "active" : "suspended")}
                            </Badge>
                          </motion.div>
                          <Badge variant="outline" className="capitalize">
                            {user.role || (user.authorities?.[0]?.authority?.replace('ROLE_', '') || 'user').toLowerCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Joined: {user.joinDate || new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <motion.div
                        className="hidden md:block text-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.03 }}
                      >
                        <p className="text-sm text-muted-foreground">
                          {user.role === "farmer" ? "Products" : "Orders"}
                        </p>
                        <motion.p 
                          className="font-semibold text-lg"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.03, type: "spring" }}
                        >
                          {user.role === "farmer" ? (user.products || 0) : (user.orders || 0)}
                        </motion.p>
                      </motion.div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          {(user.status === "pending" || user.enabled === false) && (
                            <DropdownMenuItem 
                              onClick={() => handleApprove(user.id, user.name || user.username)}
                              className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {(user.status === "active" || user.enabled !== false) && (
                            <DropdownMenuItem 
                              onClick={() => handleSuspend(user.id, user.name || user.username)}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </AnimatePresence>
      
      {userList.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          </motion.div>
          <h3 className="font-semibold text-lg mb-2">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </StaggerContainer>
  );

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-lift">
                  <Users className="h-3 w-3 mr-1" />
                  Users
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">User Management</h1>
              <p className="text-muted-foreground">Manage all platform users</p>
            </div>
          </StaggerItem>

          {/* Stats */}
          <StaggerItem>
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <StaggerItem key={stat.title}>
                      <HoverLift>
                        <Card className="hover-glow overflow-hidden relative group">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </CardTitle>
                            <motion.div
                              className={`p-2 rounded-xl ${stat.bg}`}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                            >
                              <Icon className={`h-4 w-4 ${stat.color}`} />
                            </motion.div>
                          </CardHeader>
                          <CardContent>
                            <motion.p
                              className={`text-3xl font-bold ${stat.color}`}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            >
                              {stat.value}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </ScrollReveal>
          </StaggerItem>

          {/* Filters */}
          <StaggerItem>
            <SlideIn direction="up" delay={0.2}>
              <motion.div 
                className="flex flex-col md:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users by name or email..." 
                    className="pl-10 rounded-xl transition-all focus:ring-2 focus:ring-primary/20" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px] rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </SlideIn>
          </StaggerItem>

          {/* Tabs */}
          <StaggerItem>
            <Tabs defaultValue="all" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <TabsList className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    All Users
                  </TabsTrigger>
                  <TabsTrigger value="farmers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Farmers
                  </TabsTrigger>
                  <TabsTrigger value="buyers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Buyers
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Pending
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-12 w-12 text-indigo-600" /></div>
              ) : (
              <AnimatePresence mode="wait">
                <TabsContent value="all" className="mt-6">
                  <motion.div
                    key="all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserTable users={filterUsers("all")} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="farmers" className="mt-6">
                  <motion.div
                    key="farmers"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserTable users={filterUsers("farmer")} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="buyers" className="mt-6">
                  <motion.div
                    key="buyers"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserTable users={filterUsers("buyer")} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="pending" className="mt-6">
                  <motion.div
                    key="pending"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserTable users={allUsers.filter((u) => u.status === "pending" || u.enabled === false)} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
              )}
            </Tabs>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  AdminUsers
};

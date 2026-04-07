import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
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
  ShoppingCart,
  DollarSign,
  Star,
  AlertTriangle,
  MessageSquare,
  Award,
  BookOpen,
  Truck,
  MapPin,
  Tag,
  Sparkles,
  CreditCard,
  UserPlus,
  Flag,
  TrendingUp,
  Settings,
  Check,
  Trash2,
  Filter,
  Bell,
  BellOff
} from "lucide-react";
import { notifications as mockNotifications } from "../../utils/mockData";
import { notificationApi } from "../../utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const iconMap = {
  ShoppingCart,
  DollarSign,
  Star,
  AlertTriangle,
  MessageSquare,
  Award,
  BookOpen,
  Truck,
  MapPin,
  Tag,
  Sparkles,
  CreditCard,
  UserPlus,
  Flag,
  TrendingUp,
  Settings
};

const colorMap = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  destructive: "bg-red-500/10 text-red-600 border-red-500/20"
};

function Notifications() {
  const { user } = useAuth();
  
  const [notificationList, setNotificationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const data = await notificationApi.getAll();
        if (Array.isArray(data)) {
          setNotificationList(data);
        } else if (data && Array.isArray(data.content)) {
          setNotificationList(data.content);
        } else {
          const userNotifications = mockNotifications[user?.role] || mockNotifications["admin"] || [];
          setNotificationList(userNotifications);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        toast.error("Could not reach backend. Showing cached notifications.");
        const userNotifications = mockNotifications[user?.role] || mockNotifications["admin"] || [];
        setNotificationList(userNotifications);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = async (id) => {
    setNotificationList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    try {
      await notificationApi.markAsRead(id);
    } catch {
      // Ignore if offline fallback
    }
  };

  const markAllAsRead = async () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await notificationApi.markAllAsRead();
    } catch {
      // Ignore
    }
  };

  const deleteNotification = async (id) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
    try {
      await notificationApi.delete(id);
    } catch {
      // Ignore
    }
  };

  const clearAll = async () => {
    for(const n of notificationList) {
       await deleteNotification(n.id);
    }
  };

  const filteredNotifications = filter === "all"
    ? notificationList
    : filter === "unread"
    ? notificationList.filter(n => !n.read)
    : notificationList.filter(n => n.read);

  const groupByDate = (notifications) => {
    const today = [];
    const yesterday = [];
    const older = [];

    notifications.forEach(notification => {
      if (notification.time.includes("minute") || notification.time.includes("hour")) {
        today.push(notification);
      } else if (notification.time.includes("1 day")) {
        yesterday.push(notification);
      } else {
        older.push(notification);
      }
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupByDate(filteredNotifications);

  const renderNotification = (notification, index) => {
    const Icon = iconMap[notification.icon] || MessageSquare;
    const colorClass = colorMap[notification.color] || colorMap.primary;

    return (
      <motion.div
        key={notification.id}
        layout
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.95 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <HoverLift>
          <Card
            className={`mb-3 transition-all duration-300 hover:shadow-lg overflow-hidden ${
              notification.read ? "opacity-60" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <motion.div 
                  className={`p-3 rounded-xl border ${colorClass} relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-current opacity-0"
                    whileHover={{ opacity: 0.1 }}
                  />
                  <Icon className="h-5 w-5 relative z-10" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <motion.h4 
                      className="font-semibold text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {notification.title}
                    </motion.h4>
                    {!notification.read && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                      >
                        <Badge 
                          variant="default" 
                          className="h-2 w-2 p-0 rounded-full animate-pulse" 
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                  >
                    {notification.message}
                  </motion.p>
                  
                  <div className="flex items-center justify-between">
                    <motion.span 
                      className="text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      {notification.time}
                    </motion.span>
                    
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                    >
                      {!notification.read && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-7 text-xs hover:bg-primary/10"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        </motion.div>
                      )}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </HoverLift>
      </motion.div>
    );
  };

  const renderSection = (title, notifications) => {
    if (notifications.length === 0) return null;

    return (
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h3 
          className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="h-1 w-1 bg-primary rounded-full" />
          {title}
        </motion.h3>
        <AnimatePresence>
          {notifications.map((notification, index) => renderNotification(notification, index))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <DashboardLayout>
      <AnimatedPage className="p-6 max-w-4xl mx-auto">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 mb-2">
                    <Bell className="h-3 w-3 mr-1" />
                    Notifications
                  </Badge>
                </motion.div>
                <h1 className="text-3xl font-bold mb-1">Notifications</h1>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {unreadCount > 0 ? (
                    <span className="flex items-center gap-2">
                      You have{" "}
                      <motion.span
                        className="font-semibold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {unreadCount}
                      </motion.span>{" "}
                      unread notification{unreadCount !== 1 ? "s" : ""}
                    </span>
                  ) : (
                    "You're all caught up!"
                  )}
                </motion.p>
              </div>

              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {unreadCount > 0 && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" onClick={markAllAsRead} className="hover:bg-primary/10">
                      <Check className="h-4 w-4 mr-2" />
                      Mark all as read
                    </Button>
                  </motion.div>
                )}
                {notificationList.length > 0 && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear all
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </StaggerItem>

          {/* Tabs */}
          <StaggerItem>
            <SlideIn direction="up" delay={0.2}>
              <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    All
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge variant="secondary" className="ml-2">
                        {notificationList.length}
                      </Badge>
                    </motion.div>
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Unread
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Badge variant="default" className="ml-2 animate-pulse">
                          {unreadCount}
                        </Badge>
                      </motion.div>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="read" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Read
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </SlideIn>
          </StaggerItem>

          {/* Notification List */}
          <StaggerItem>
            <ScrollReveal>
              <AnimatePresence mode="wait">
                {filteredNotifications.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <motion.div 
                          className="h-16 w-16 rounded-full bg-muted flex items-center justify-center"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <BellOff className="h-8 w-8 text-muted-foreground" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold mb-1">No notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            {filter === "unread"
                              ? "You've read all your notifications"
                              : "You'll see notifications here when you get them"}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isLoading ? (
                      <div className="flex justify-center p-12">
                        <Loader2 className="animate-spin h-8 w-8 text-primary" />
                      </div>
                    ) : (
                      <>
                        {renderSection("Today", today)}
                        {renderSection("Yesterday", yesterday)}
                        {renderSection("Older", older)}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}

export { Notifications };

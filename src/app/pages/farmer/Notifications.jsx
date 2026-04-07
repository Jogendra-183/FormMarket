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
  HoverLift
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
          const userNotifications = mockNotifications[user?.role] || mockNotifications["farmer"] || [];
          setNotificationList(userNotifications);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        toast.error("Could not reach backend. Showing cached notifications.");
        const userNotifications = mockNotifications[user?.role] || mockNotifications["farmer"] || [];
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
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100, scale: 0.95 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <HoverLift>
          <Card className={`mb-3 transition-all hover-glow ${
            notification.read ? "opacity-60" : ""
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <motion.div 
                  className={`p-3 rounded-xl border ${colorClass}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <motion.h4 
                      className="font-semibold text-sm"
                      whileHover={{ color: 'var(--primary)' }}
                    >
                      {notification.title}
                    </motion.h4>
                    {!notification.read && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Badge variant="default" className="h-2 w-2 p-0 rounded-full animate-pulse" />
                      </motion.div>
                    )}
                  </div>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
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
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      {!notification.read && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-7 text-xs rounded-lg"
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
                          className="h-7 text-xs text-destructive hover:text-destructive rounded-lg"
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

  const renderSection = (title, notifications, sectionIndex) => {
    if (notifications.length === 0) return null;

    return (
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionIndex * 0.1 }}
      >
        <motion.h3 
          className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {title}
        </motion.h3>
        <AnimatePresence mode="popLayout">
          {notifications.map((n, i) => renderNotification(n, i))}
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
                  <Badge variant="outline" className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover-lift">
                    <Bell className="h-3 w-3 mr-1" />
                    Farm Alerts
                  </Badge>
                </motion.div>
                <motion.h1 
                  className="text-3xl font-semibold mt-2 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Notifications
                </motion.h1>
                <motion.p 
                  className="text-muted-foreground flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {unreadCount > 0 ? (
                    <>
                      You have{" "}
                      <motion.span 
                        className="text-emerald-600 font-semibold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
                      >
                        {unreadCount}
                      </motion.span>{" "}
                      unread notification{unreadCount !== 1 ? "s" : ""}
                    </>
                  ) : (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        🌾
                      </motion.span>
                      You're all caught up!
                    </>
                  )}
                </motion.p>
              </div>

              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {unreadCount > 0 && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" onClick={markAllAsRead} className="rounded-xl">
                      <Check className="h-4 w-4 mr-2" />
                      Mark all as read
                    </Button>
                  </motion.div>
                )}
                {notificationList.length > 0 && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive rounded-xl">
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
                    All
                    <Badge variant="secondary" className="ml-2">
                      {notificationList.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
                    Unread
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Badge variant="default" className="ml-2">
                          {unreadCount}
                        </Badge>
                      </motion.div>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="read" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg">
                    Read
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </StaggerItem>

          {/* Content */}
          <StaggerItem>
            <AnimatePresence mode="wait">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-12 text-center hover-glow">
                    <div className="flex flex-col items-center gap-4">
                      <motion.div 
                        className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BellOff className="h-8 w-8 text-muted-foreground" />
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="font-semibold mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          No notifications
                        </motion.h3>
                        <motion.p 
                          className="text-sm text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {filter === "unread"
                            ? "You've read all your notifications"
                            : "You'll see notifications here when you get them"}
                        </motion.p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <div className="flex justify-center p-12">
                      <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
                    </div>
                  ) : (
                    <>
                      {renderSection("Today", today, 0)}
                      {renderSection("Yesterday", yesterday, 1)}
                      {renderSection("Older", older, 2)}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}

export { Notifications };

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
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
  Filter
} from "lucide-react";
import { notifications } from "../../utils/mockData";

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
  const userNotifications = notifications[user?.role] || [];
  
  const [notificationList, setNotificationList] = useState(userNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotificationList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotificationList([]);
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

  const renderNotification = (notification) => {
    const Icon = iconMap[notification.icon] || MessageSquare;
    const colorClass = colorMap[notification.color] || colorMap.primary;

    return (
      <Card
        key={notification.id}
        className={`mb-3 transition-all hover:shadow-md ${
          notification.read ? "opacity-60" : ""
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl border ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                {!notification.read && (
                  <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {notification.message}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
                
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-7 text-xs"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark as read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                    className="h-7 text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title, notifications) => {
    if (notifications.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          {title}
        </h3>
        {notifications.map(renderNotification)}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-1">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "You're all caught up!"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
            {notificationList.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {notificationList.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="default" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
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
        ) : (
          <>
            {renderSection("Today", today)}
            {renderSection("Yesterday", yesterday)}
            {renderSection("Older", older)}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export { Notifications };

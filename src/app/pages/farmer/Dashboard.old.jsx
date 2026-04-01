import { Link } from "react-router";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  HoverLift,
  AnimatedPage
} from "../../components/AnimationWrappers";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  MessageSquare,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { analyticsData, orders } from "../../utils/mockData";

const COLORS = ["#1f5b3b", "#4f8ea0", "#f5b84b", "#d67c5a"];

function FarmerDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$8,124",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Products Listed",
      value: "24",
      change: "+3",
      trend: "up",
      icon: Package
    },
    {
      title: "Active Orders",
      value: "12",
      change: "-2",
      trend: "down",
      icon: ShoppingCart
    },
    {
      title: "Growth Rate",
      value: "18.2%",
      change: "+4.1%",
      trend: "up",
      icon: TrendingUp
    }
  ];

  const quickActions = [
    {
      label: "Add new listing",
      description: "Publish today's harvest in minutes",
      icon: Plus,
      path: "/farmer/products"
    },
    {
      label: "Review open orders",
      description: "Check fulfillment and buyer notes",
      icon: ShoppingCart,
      path: "/farmer/orders"
    },
    {
      label: "Message the community",
      description: "Answer questions and build trust",
      icon: MessageSquare,
      path: "/community"
    }
  ];

  const checklist = [
    { task: "Update tomato stock levels", status: "Due today" },
    { task: "Confirm Friday delivery slots", status: "Next 24h" },
    { task: "Add spring greens bundle", status: "This week" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <StaggerContainer className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <StaggerItem>
            <div>
              <Badge variant="outline" className="bg-white/70 hover-lift">
                Farm pulse
              </Badge>
              <h1 className="text-3xl md:text-4xl mt-3">Farmer Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your harvest performance and next moves.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex gap-3 flex-wrap">
              <Link to="/farmer/products">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button>
                    <Plus className="h-4 w-4" />
                    New Listing
                  </Button>
                </motion.div>
              </Link>
              <Link to="/farmer/orders">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline">View Orders</Button>
                </motion.div>
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.title} threshold={0.3}>
                <HoverLift>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                          repeatDelay: 5
                        }}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="text-2xl font-semibold"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        {stat.value}
                      </motion.div>
                      <p
                        className={`text-xs flex items-center gap-1 ${
                          stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.label} className="flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-4">{action.label}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link to={action.path}>
                    <Button variant="outline" className="w-full">
                      Open
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.revenue}>
                  <defs>
                    <linearGradient id="farmRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1f5b3b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1f5b3b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#1f5b3b" fillOpacity={1} fill="url(#farmRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.sales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.sales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-black/5 rounded-2xl bg-white/70"
                  >
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs rounded-full ${
                          order.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "Processing"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's checklist</CardTitle>
              <CardDescription>Stay on top of operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {checklist.map((item) => (
                <div key={item.task} className="rounded-2xl border border-black/5 bg-white/70 p-4">
                  <p className="font-semibold">{item.task}</p>
                  <p className="text-sm text-muted-foreground">{item.status}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View full schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export { FarmerDashboard };

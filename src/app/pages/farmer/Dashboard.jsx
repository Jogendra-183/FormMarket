import { Link } from "react-router";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
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

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];

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
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Badge variant="outline" className="mb-3">
              Farm Pulse
            </Badge>
            <h1 className="text-4xl font-black mb-2">Farmer Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Here's your harvest performance and next moves.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/farmer/products">
              <Button magnetic size="lg" className="rounded-2xl">
                <Plus className="h-4 w-4" />
                New Listing
              </Button>
            </Link>
            <Link to="/farmer/orders">
              <Button variant="outline" size="lg" className="rounded-2xl">
                View Orders
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black mb-2">{stat.value}</div>
                    <p className={`text-xs flex items-center gap-1 ${
                      stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl">{action.label}</CardTitle>
                    <CardDescription className="text-base">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={action.path}>
                      <Button variant="outline" className="w-full rounded-xl">
                        Open
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.revenue}>
                    <defs>
                      <linearGradient id="farmRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#farmRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Sales by Category</CardTitle>
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
                      outerRadius={100}
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
          </motion.div>
        </div>

        {/* Recent Orders & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-2xl hover:shadow-md transition-all"
                    >
                      <div>
                        <p className="font-bold text-lg">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground mt-1">{order.items.join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl mb-1">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground mb-2">{order.date}</p>
                        <Badge className={
                          order.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : order.status === "Processing"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-sky-100 text-sky-700 hover:bg-sky-100"
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Today's Checklist</CardTitle>
                <CardDescription>Stay on top of operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {checklist.map((item, index) => (
                  <div 
                    key={item.task} 
                    className="rounded-2xl border p-4 hover:shadow-md transition-all"
                  >
                    <p className="font-bold mb-1">{item.task}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl mt-4">
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export { FarmerDashboard };

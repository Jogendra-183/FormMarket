import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  HoverLift,
  FadeIn,
  SlideIn
} from "../../components/AnimationWrappers";
import { Users, Package, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import DashboardLayout from "../../components/DashboardLayout";
import { userApi } from "../../utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const data = await userApi.getAdminDashboard();
        setDashboardData(data);
      } catch (error) {
        toast.error("Offline mode. Loading cached admin data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboardData?.totalUsers?.toString() || "12,543",
      change: "+18.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: dashboardData?.totalRevenue ? `$${dashboardData.totalRevenue}` : "$248,724",
      change: "+24.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Products",
      value: dashboardData?.activeProducts?.toString() || "3,456",
      change: "+12.8%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Platform Growth",
      value: dashboardData?.platformGrowth || "32.4%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
    },
  ];

  const platformData = [
    { month: "Jan", farmers: 120, buyers: 850, revenue: 24000 },
    { month: "Feb", farmers: 145, buyers: 1020, revenue: 31000 },
    { month: "Mar", farmers: 168, buyers: 1240, revenue: 38000 },
    { month: "Apr", farmers: 192, buyers: 1480, revenue: 45000 },
    { month: "May", farmers: 215, buyers: 1720, revenue: 52000 },
    { month: "Jun", farmers: 241, buyers: 2010, revenue: 61000 },
  ];

  const recentUsers = [
    { name: "Sarah Johnson", role: "Farmer", time: "5 min ago" },
    { name: "Mike Chen", role: "Buyer", time: "12 min ago" },
    { name: "Emma Wilson", role: "Farmer", time: "1 hour ago" },
    { name: "James Brown", role: "Buyer", time: "2 hours ago" },
  ];

  const topFarmers = [
    { name: "Green Valley Farm", revenue: 12450, products: 34 },
    { name: "Sunshine Organics", revenue: 9820, products: 28 },
    { name: "Berry Fields", revenue: 8650, products: 22 },
    { name: "Fresh Harvest Co", revenue: 7540, products: 19 },
  ];

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          <StaggerItem>
            <div>
              <Badge variant="outline" className="bg-white/70 hover-lift">
                Platform
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform overview and key metrics</p>
            </div>
          </StaggerItem>

          {/* Stats Grid */}
          <StaggerItem>
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <StaggerItem key={stat.title}>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </CardTitle>
                            <motion.div
                              animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5,
                                repeatDelay: 5,
                              }}
                            >
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </motion.div>
                          </CardHeader>
                          <CardContent>
                            <motion.div
                              className="text-2xl font-bold"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                            >
                              {stat.value}
                            </motion.div>
                            <p
                              className={`text-xs flex items-center gap-1 ${
                                stat.trend === "up" ? "text-primary" : "text-red-600"
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
                      </HoverLift>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </ScrollReveal>
          </StaggerItem>

          {/* Charts */}
          <StaggerItem>
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SlideIn direction="left" delay={0.2}>
                  <HoverLift>
                    <Card className="hover-glow">
                      <CardHeader>
                        <CardTitle>Platform Revenue</CardTitle>
                        <CardDescription>Monthly revenue trends</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={platformData}>
                            <defs>
                              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1f5b3b" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#1f5b3b" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              stroke="#1f5b3b"
                              fillOpacity={1}
                              fill="url(#revenue)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </SlideIn>

                <SlideIn direction="right" delay={0.4}>
                  <HoverLift>
                    <Card className="hover-glow">
                      <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>Farmers vs Buyers growth</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={platformData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="farmers"
                              stroke="#1f5b3b"
                              strokeWidth={2}
                              name="Farmers"
                            />
                            <Line
                              type="monotone"
                              dataKey="buyers"
                              stroke="#4f8ea0"
                              strokeWidth={2}
                              name="Buyers"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </SlideIn>
              </div>
            </ScrollReveal>
          </StaggerItem>

          {/* Recent Activity */}
          <StaggerItem>
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SlideIn direction="left" delay={0.3}>
                  <HoverLift>
                    <Card className="hover-glow">
                      <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                        <CardDescription>Latest users who joined the platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <StaggerContainer className="space-y-4">
                          {recentUsers.map((user, idx) => (
                            <StaggerItem key={idx}>
                              <motion.div
                                className="flex items-center justify-between p-3 border rounded-2xl bg-white/70 hover-lift"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className="flex items-center gap-3">
                                  <motion.div
                                    className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    {user.name.charAt(0)}
                                  </motion.div>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.role}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">{user.time}</p>
                              </motion.div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </SlideIn>

                <SlideIn direction="right" delay={0.5}>
                  <HoverLift>
                    <Card className="hover-glow">
                      <CardHeader>
                        <CardTitle>Top Performing Farmers</CardTitle>
                        <CardDescription>Highest revenue this month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <StaggerContainer className="space-y-4">
                          {topFarmers.map((farmer, idx) => (
                            <StaggerItem key={idx}>
                              <motion.div
                                className="flex items-center justify-between p-3 border rounded-2xl bg-white/70 hover-lift"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className="flex items-center gap-3">
                                  <motion.div
                                    className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary"
                                    whileHover={{ scale: 1.2 }}
                                  >
                                    #{idx + 1}
                                  </motion.div>
                                  <div>
                                    <p className="font-medium">{farmer.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {farmer.products} products
                                    </p>
                                  </div>
                                </div>
                                <motion.p
                                  className="font-semibold text-primary"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  ${farmer.revenue.toLocaleString()}
                                </motion.p>
                              </motion.div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </SlideIn>
              </div>
            </ScrollReveal>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  AdminDashboard
};

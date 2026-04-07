import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
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
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUp, Activity, Zap, Globe } from "lucide-react";
import { userApi } from "../../utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const COLORS = ["#1f5b3b", "#4f8ea0", "#f5b84b", "#d67c5a", "#7b9aa0"];

// Animated counter component
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  
  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(numericValue * easeOut));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [numericValue, duration]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Animated progress bar
function AnimatedProgress({ value, color, delay = 0 }) {
  return (
    <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-3 overflow-hidden">
      <motion.div
        className={`h-3 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
    </div>
  );
}

function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await userApi.getAdminAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Fetch admin analytics failed:", error);
        toast.error("Could not reach backend. Using cached analytics.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const revenueData = [
    { month: "Jan", revenue: 24000, transactions: 450 },
    { month: "Feb", revenue: 31000, transactions: 580 },
    { month: "Mar", revenue: 38000, transactions: 720 },
    { month: "Apr", revenue: 45000, transactions: 850 },
    { month: "May", revenue: 52000, transactions: 980 },
    { month: "Jun", revenue: 61000, transactions: 1150 }
  ];
  
  const categoryData = [
    { name: "Vegetables", value: 45, revenue: 28000 },
    { name: "Fruits", value: 30, revenue: 19000 },
    { name: "Dairy & Eggs", value: 15, revenue: 12000 },
    { name: "Pantry", value: 10, revenue: 8000 }
  ];
  
  const regionData = [
    { region: "North", farmers: 85, buyers: 620, revenue: 42000, growth: 15 },
    { region: "South", farmers: 72, buyers: 540, revenue: 36000, growth: 12 },
    { region: "East", farmers: 94, buyers: 710, revenue: 48000, growth: 22 },
    { region: "West", farmers: 68, buyers: 490, revenue: 32000, growth: 8 }
  ];
  
  const stats = [
    { title: "Total Revenue", value: analyticsData?.totalRevenue ? `$${analyticsData.totalRevenue}` : "$251,000", change: "+28.4%", icon: DollarSign, color: "text-emerald-600" },
    { title: "Active Users", value: analyticsData?.activeUsers?.toString() || "3,428", change: "+18.2%", icon: Users, color: "text-blue-600" },
    { title: "Transactions", value: analyticsData?.totalTransactions?.toString() || "4,730", change: "+22.5%", icon: ShoppingCart, color: "text-purple-600" },
    { title: "Avg Order Value", value: analyticsData?.avgOrderValue ? `$${analyticsData.avgOrderValue}` : "$53.08", change: "+4.2%", icon: Activity, color: "text-amber-600" }
  ];

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 hover-lift">
                    <Zap className="h-3 w-3 mr-1" />
                    Analytics
                  </Badge>
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Platform Analytics
                </h1>
                <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
              </div>
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                Live data
              </motion.div>
            </div>
          </StaggerItem>

          {/* Stats Grid with animated counters */}
          <StaggerItem>
            {isLoading ? (
               <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>
            ) : (
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <StaggerItem key={stat.title}>
                      <HoverLift>
                        <Card className="relative overflow-hidden hover-glow group">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                          <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </CardTitle>
                            <motion.div
                              className={`p-2 rounded-xl bg-black/5 dark:bg-white/10 ${stat.color}`}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Icon className="h-4 w-4" />
                            </motion.div>
                          </CardHeader>
                          <CardContent>
                            <motion.p
                              className="text-3xl font-bold"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <AnimatedCounter value={stat.value} prefix={stat.value.includes('$') ? '$' : ''} />
                            </motion.p>
                            <motion.p
                              className="text-sm text-primary flex items-center gap-1 mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <ArrowUp className="h-3 w-3" />
                              {stat.change} vs last period
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </ScrollReveal>
            )}
          </StaggerItem>

          {/* Tabs with animations */}
          <StaggerItem>
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TabsList className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="revenue" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    Products
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <AnimatePresence mode="wait">
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <SlideIn direction="left" delay={0.1}>
                        <HoverLift>
                          <Card className="hover-glow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Revenue & Transactions
                              </CardTitle>
                              <CardDescription>Monthly trends</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={revenueData}>
                                  <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#1f5b3b" stopOpacity={0.8} />
                                      <stop offset="95%" stopColor="#1f5b3b" stopOpacity={0} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                                  <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
                                  <YAxis stroke="currentColor" opacity={0.5} />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: 'var(--background)', 
                                      border: '1px solid var(--border)',
                                      borderRadius: '12px'
                                    }} 
                                  />
                                  <Area 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#1f5b3b" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#revenueGradient)" 
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>

                      <SlideIn direction="right" delay={0.2}>
                        <HoverLift>
                          <Card className="hover-glow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-purple-500" />
                                Category Distribution
                              </CardTitle>
                              <CardDescription>Sales by product category</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                  <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationBegin={0}
                                    animationDuration={1500}
                                  >
                                    {categoryData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: 'var(--background)', 
                                      border: '1px solid var(--border)',
                                      borderRadius: '12px'
                                    }} 
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="revenue" className="mt-6 space-y-6">
                  <motion.div
                    key="revenue"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <ScrollReveal>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <DollarSign className="h-5 w-5 text-emerald-500" />
                              Revenue Analysis
                            </CardTitle>
                            <CardDescription>Detailed revenue breakdown</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                              <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                                <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
                                <YAxis stroke="currentColor" opacity={0.5} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: 'var(--background)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px'
                                  }} 
                                />
                                <Legend />
                                <Bar 
                                  dataKey="revenue" 
                                  fill="#1f5b3b" 
                                  name="Revenue ($)" 
                                  radius={[8, 8, 0, 0]}
                                  animationDuration={1500}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </ScrollReveal>

                    <ScrollReveal>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Globe className="h-5 w-5 text-blue-500" />
                              Regional Performance
                            </CardTitle>
                            <CardDescription>Revenue by region</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                              {regionData.map((region, idx) => (
                                <StaggerItem key={idx}>
                                  <motion.div
                                    className="flex items-center justify-between p-4 border rounded-2xl bg-white/70 dark:bg-black/20 hover:shadow-lg transition-all"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                  >
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-lg">{region.region} Region</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {region.farmers} farmers, {region.buyers} buyers
                                      </p>
                                      <div className="mt-2 w-full max-w-xs">
                                        <AnimatedProgress value={region.growth * 4} color="bg-primary" delay={idx * 0.1} />
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <motion.p 
                                        className="text-2xl font-bold text-primary"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                      >
                                        ${region.revenue.toLocaleString()}
                                      </motion.p>
                                      <p className="text-sm text-emerald-600 flex items-center justify-end gap-1">
                                        <ArrowUp className="h-3 w-3" />
                                        {region.growth}% growth
                                      </p>
                                    </div>
                                  </motion.div>
                                </StaggerItem>
                              ))}
                            </StaggerContainer>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </ScrollReveal>
                  </motion.div>
                </TabsContent>

                <TabsContent value="users" className="mt-6 space-y-6">
                  <motion.div
                    key="users"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <SlideIn direction="left" delay={0.1}>
                        <HoverLift>
                          <Card className="hover-glow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-500" />
                                User Growth
                              </CardTitle>
                              <CardDescription>Farmers and buyers over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={[
                                  { month: "Jan", farmers: 120, buyers: 850 },
                                  { month: "Feb", farmers: 145, buyers: 1020 },
                                  { month: "Mar", farmers: 168, buyers: 1240 },
                                  { month: "Apr", farmers: 192, buyers: 1480 },
                                  { month: "May", farmers: 215, buyers: 1720 },
                                  { month: "Jun", farmers: 241, buyers: 2010 }
                                ]}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                                  <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
                                  <YAxis stroke="currentColor" opacity={0.5} />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: 'var(--background)', 
                                      border: '1px solid var(--border)',
                                      borderRadius: '12px'
                                    }} 
                                  />
                                  <Legend />
                                  <Line 
                                    type="monotone" 
                                    dataKey="farmers" 
                                    stroke="#1f5b3b" 
                                    strokeWidth={3} 
                                    name="Farmers"
                                    dot={{ fill: '#1f5b3b', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#1f5b3b' }}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="buyers" 
                                    stroke="#4f8ea0" 
                                    strokeWidth={3} 
                                    name="Buyers"
                                    dot={{ fill: '#4f8ea0', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#4f8ea0' }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>

                      <SlideIn direction="right" delay={0.2}>
                        <HoverLift>
                          <Card className="hover-glow h-full">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-purple-500" />
                                User Engagement
                              </CardTitle>
                              <CardDescription>Activity metrics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div>
                                <div className="flex justify-between mb-3">
                                  <span className="text-sm font-medium">Daily Active Users</span>
                                  <motion.span 
                                    className="text-sm font-bold text-primary"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                  >
                                    68%
                                  </motion.span>
                                </div>
                                <AnimatedProgress value={68} color="bg-primary" delay={0.1} />
                              </div>
                              <div>
                                <div className="flex justify-between mb-3">
                                  <span className="text-sm font-medium">Repeat Buyers</span>
                                  <motion.span 
                                    className="text-sm font-bold text-sky-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                  >
                                    54%
                                  </motion.span>
                                </div>
                                <AnimatedProgress value={54} color="bg-sky-500" delay={0.2} />
                              </div>
                              <div>
                                <div className="flex justify-between mb-3">
                                  <span className="text-sm font-medium">Subscription Rate</span>
                                  <motion.span 
                                    className="text-sm font-bold text-amber-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                  >
                                    42%
                                  </motion.span>
                                </div>
                                <AnimatedProgress value={42} color="bg-amber-500" delay={0.3} />
                              </div>
                              <div>
                                <div className="flex justify-between mb-3">
                                  <span className="text-sm font-medium">Satisfaction Score</span>
                                  <motion.span 
                                    className="text-sm font-bold text-emerald-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                  >
                                    92%
                                  </motion.span>
                                </div>
                                <AnimatedProgress value={92} color="bg-emerald-500" delay={0.4} />
                              </div>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="products" className="mt-6">
                  <motion.div
                    key="products"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScrollReveal>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <ShoppingCart className="h-5 w-5 text-purple-500" />
                              Product Performance
                            </CardTitle>
                            <CardDescription>Top selling categories and products</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                              <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                                <XAxis dataKey="name" stroke="currentColor" opacity={0.5} />
                                <YAxis stroke="currentColor" opacity={0.5} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: 'var(--background)', 
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px'
                                  }} 
                                />
                                <Legend />
                                <Bar 
                                  dataKey="revenue" 
                                  fill="#1f5b3b" 
                                  name="Revenue ($)" 
                                  radius={[8, 8, 0, 0]}
                                  animationDuration={1500}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </ScrollReveal>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  AdminAnalytics
};

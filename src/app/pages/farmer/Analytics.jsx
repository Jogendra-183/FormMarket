import { useState, useEffect } from "react";
import { motion } from "motion/react";
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
  FadeIn,
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
import { analyticsData } from "../../utils/mockData";
import { userApi } from "../../utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const COLORS = ["#1f5b3b", "#4f8ea0", "#f5b84b", "#d67c5a"];

function FarmerAnalytics() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await userApi.getFarmerDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error("Fetch analytics data failed:", error);
        toast.error("Could not reach backend. Showing offline analytics.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const customerData = [
    { month: "Jan", new: 12, returning: 34 },
    { month: "Feb", new: 19, returning: 42 },
    { month: "Mar", new: 15, returning: 38 },
    { month: "Apr", new: 25, returning: 51 },
    { month: "May", new: 22, returning: 48 },
    { month: "Jun", new: 30, returning: 62 },
  ];

  // CountUp component for animated numbers
  const CountUpNumber = ({ value, prefix = "", suffix = "" }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl font-bold"
      >
        {prefix}{value}{suffix}
      </motion.div>
    );
  };

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          <StaggerItem>
            <div>
              <Badge variant="outline" className="bg-white/70 hover-lift">
                Insights
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Analytics</h1>
              <p className="text-muted-foreground">
                Insights and performance metrics for your farm
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <FadeIn delay={0.3}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="hover-glow">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <StaggerContainer className="space-y-6">
                    <StaggerItem>
                      <ScrollReveal>
                        {isLoading ? (
                          <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>
                        ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <SlideIn direction="left" delay={0.2}>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle>Revenue Trends</CardTitle>
                                  <CardDescription>Monthly revenue over the past 6 months</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={analyticsData.revenue}>
                                      <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
                                        dataKey="value"
                                        stroke="#1f5b3b"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
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
                                  <CardTitle>Sales by Category</CardTitle>
                                  <CardDescription>Product category distribution</CardDescription>
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
                              </HoverLift>
                            </SlideIn>
                          </div>
                        )}
                      </ScrollReveal>
                    </StaggerItem>

                    <StaggerItem>
                      <SlideIn direction="up" delay={0.6}>
                        <HoverLift>
                          <Card className="hover-glow">
                            <CardHeader>
                              <CardTitle>Top Products by Sales</CardTitle>
                              <CardDescription>Best performing products this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analyticsData.topProducts}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="sales" fill="#1f5b3b" />
                                </BarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>
                    </StaggerItem>
                  </StaggerContainer>
                </TabsContent>

                <TabsContent value="sales" className="mt-6">
                  <StaggerContainer className="space-y-6">
                    <StaggerItem>
                      <ScrollReveal>
                        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <StaggerItem>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Sales
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <CountUpNumber value={dashboardData?.totalRevenue ? `$${dashboardData.totalRevenue}` : "$48,724"} />
                                  <p className="text-sm text-primary">+18.2% from last month</p>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                          <StaggerItem>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Average Order Value
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <CountUpNumber value="$67.45" />
                                  <p className="text-sm text-primary">+8.1% from last month</p>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                          <StaggerItem>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Orders
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <CountUpNumber value={dashboardData?.activeOrders?.toString() || "722"} />
                                  <p className="text-sm text-primary">+12.5% from last month</p>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                        </StaggerContainer>
                      </ScrollReveal>
                    </StaggerItem>

                    <StaggerItem>
                      <SlideIn direction="up" delay={0.4}>
                        <HoverLift>
                          <Card className="hover-glow">
                            <CardHeader>
                              <CardTitle>Sales Performance</CardTitle>
                              <CardDescription>Revenue comparison over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={analyticsData.revenue}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#1f5b3b"
                                    strokeWidth={2}
                                    name="Revenue"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>
                    </StaggerItem>
                  </StaggerContainer>
                </TabsContent>

                <TabsContent value="customers" className="mt-6">
                  <StaggerContainer className="space-y-6">
                    <StaggerItem>
                      <ScrollReveal>
                        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <StaggerItem>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Customers
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <CountUpNumber value="1,248" />
                                  <p className="text-sm text-primary">+24.1% from last month</p>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                          <StaggerItem>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Repeat Customers
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <CountUpNumber value="68%" />
                                  <p className="text-sm text-primary">+5.2% from last month</p>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                          <StaggerItem>
                            <HoverLift>
                              <Card className="hover-glow">
                                <CardHeader>
                                  <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Customer Satisfaction
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <CountUpNumber value="4.8/5.0" />
                                  <p className="text-sm text-primary">Based on 342 reviews</p>
                                </CardContent>
                              </Card>
                            </HoverLift>
                          </StaggerItem>
                        </StaggerContainer>
                      </ScrollReveal>
                    </StaggerItem>

                    <StaggerItem>
                      <SlideIn direction="up" delay={0.4}>
                        <HoverLift>
                          <Card className="hover-glow">
                            <CardHeader>
                              <CardTitle>Customer Growth</CardTitle>
                              <CardDescription>New vs returning customers</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={customerData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="new" fill="#1f5b3b" name="New Customers" />
                                  <Bar dataKey="returning" fill="#4f8ea0" name="Returning Customers" />
                                </BarChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </HoverLift>
                      </SlideIn>
                    </StaggerItem>
                  </StaggerContainer>
                </TabsContent>

                <TabsContent value="products" className="mt-6">
                  <SlideIn direction="up" delay={0.2}>
                    <HoverLift>
                      <Card className="hover-glow">
                        <CardHeader>
                          <CardTitle>Product Performance</CardTitle>
                          <CardDescription>Sales metrics for your products</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <StaggerContainer className="space-y-4">
                            {analyticsData.topProducts.map((product, index) => (
                              <StaggerItem key={product.name}>
                                <motion.div
                                  className="flex items-center justify-between p-4 border rounded-2xl bg-white/70 hover-lift"
                                  whileHover={{ scale: 1.02 }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex items-center gap-4">
                                    <motion.div
                                      className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary"
                                      whileHover={{ rotate: 360 }}
                                      transition={{ duration: 0.5 }}
                                    >
                                      #{index + 1}
                                    </motion.div>
                                    <div>
                                      <p className="font-medium">{product.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {product.sales} units sold
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <motion.p
                                      className="font-semibold"
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      ${(product.sales * 4.99).toFixed(2)}
                                    </motion.p>
                                    <p className="text-sm text-muted-foreground">Revenue</p>
                                  </div>
                                </motion.div>
                              </StaggerItem>
                            ))}
                          </StaggerContainer>
                        </CardContent>
                      </Card>
                    </HoverLift>
                  </SlideIn>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  FarmerAnalytics
};

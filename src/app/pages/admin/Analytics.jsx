import DashboardLayout from "../../components/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
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
const COLORS = ["#1f5b3b", "#4f8ea0", "#f5b84b", "#d67c5a", "#7b9aa0"];
function AdminAnalytics() {
  const revenueData = [
    { month: "Jan", revenue: 24e3, transactions: 450 },
    { month: "Feb", revenue: 31e3, transactions: 580 },
    { month: "Mar", revenue: 38e3, transactions: 720 },
    { month: "Apr", revenue: 45e3, transactions: 850 },
    { month: "May", revenue: 52e3, transactions: 980 },
    { month: "Jun", revenue: 61e3, transactions: 1150 }
  ];
  const categoryData = [
    { name: "Vegetables", value: 45, revenue: 28e3 },
    { name: "Fruits", value: 30, revenue: 19e3 },
    { name: "Dairy & Eggs", value: 15, revenue: 12e3 },
    { name: "Pantry", value: 10, revenue: 8e3 }
  ];
  const regionData = [
    { region: "North", farmers: 85, buyers: 620, revenue: 42e3 },
    { region: "South", farmers: 72, buyers: 540, revenue: 36e3 },
    { region: "East", farmers: 94, buyers: 710, revenue: 48e3 },
    { region: "West", farmers: 68, buyers: 490, revenue: 32e3 }
  ];
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Analytics</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">Platform Analytics</h1><p className="text-muted-foreground">Comprehensive insights and performance metrics</p></div><Tabs defaultValue="overview" className="w-full"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="revenue">Revenue</TabsTrigger><TabsTrigger value="users">Users</TabsTrigger><TabsTrigger value="products">Products</TabsTrigger></TabsList><TabsContent value="overview" className="mt-6 space-y-6"><div className="grid grid-cols-1 md:grid-cols-4 gap-4"><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">$251,000</p><p className="text-sm text-primary">+28.4% vs last period</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">3,428</p><p className="text-sm text-primary">+18.2% vs last period</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                    Transactions
                  </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">4,730</p><p className="text-sm text-primary">+22.5% vs last period</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Order Value
                  </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">$53.08</p><p className="text-sm text-primary">+4.2% vs last period</p></CardContent></Card></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card><CardHeader><CardTitle>Revenue & Transactions</CardTitle><CardDescription>Monthly trends</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><AreaChart data={revenueData}><defs><linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1f5b3b" stopOpacity={0.8} /><stop offset="95%" stopColor="#1f5b3b" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="revenue" stroke="#1f5b3b" fillOpacity={1} fill="url(#revenue)" /></AreaChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Category Distribution</CardTitle><CardDescription>Sales by product category</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><PieChart><Pie
    data={categoryData}
    cx="50%"
    cy="50%"
    labelLine={false}
    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
    outerRadius={80}
    fill="#8884d8"
    dataKey="value"
  >{categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card></div></TabsContent><TabsContent value="revenue" className="mt-6 space-y-6"><Card><CardHeader><CardTitle>Revenue Analysis</CardTitle><CardDescription>Detailed revenue breakdown</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={400}><BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="revenue" fill="#1f5b3b" name="Revenue ($)" /></BarChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Regional Performance</CardTitle><CardDescription>Revenue by region</CardDescription></CardHeader><CardContent><div className="space-y-4">{regionData.map((region, idx) => <div key={idx} className="flex items-center justify-between p-4 border rounded-2xl bg-white/70"><div><h4 className="font-semibold">{region.region} Region</h4><p className="text-sm text-muted-foreground">{region.farmers} farmers, {region.buyers} buyers
                        </p></div><div className="text-right"><p className="text-2xl font-bold text-primary">
                          ${region.revenue.toLocaleString()}</p><p className="text-sm text-muted-foreground">Revenue</p></div></div>)}</div></CardContent></Card></TabsContent><TabsContent value="users" className="mt-6 space-y-6"><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card><CardHeader><CardTitle>User Growth</CardTitle><CardDescription>Farmers and buyers over time</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><LineChart data={[
    { month: "Jan", farmers: 120, buyers: 850 },
    { month: "Feb", farmers: 145, buyers: 1020 },
    { month: "Mar", farmers: 168, buyers: 1240 },
    { month: "Apr", farmers: 192, buyers: 1480 },
    { month: "May", farmers: 215, buyers: 1720 },
    { month: "Jun", farmers: 241, buyers: 2010 }
  ]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="farmers" stroke="#1f5b3b" strokeWidth={2} name="Farmers" /><Line type="monotone" dataKey="buyers" stroke="#4f8ea0" strokeWidth={2} name="Buyers" /></LineChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>User Engagement</CardTitle><CardDescription>Activity metrics</CardDescription></CardHeader><CardContent className="space-y-6"><div><div className="flex justify-between mb-2"><span className="text-sm font-medium">Daily Active Users</span><span className="text-sm text-muted-foreground">68%</span></div><div className="w-full bg-black/5 rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: "68%" }} /></div></div><div><div className="flex justify-between mb-2"><span className="text-sm font-medium">Repeat Buyers</span><span className="text-sm text-muted-foreground">54%</span></div><div className="w-full bg-black/5 rounded-full h-2"><div className="bg-sky-500 h-2 rounded-full" style={{ width: "54%" }} /></div></div><div><div className="flex justify-between mb-2"><span className="text-sm font-medium">Subscription Rate</span><span className="text-sm text-muted-foreground">42%</span></div><div className="w-full bg-black/5 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: "42%" }} /></div></div></CardContent></Card></div></TabsContent><TabsContent value="products" className="mt-6"><Card><CardHeader><CardTitle>Product Performance</CardTitle><CardDescription>Top selling categories and products</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={400}><BarChart data={categoryData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="revenue" fill="#1f5b3b" name="Revenue ($)" /></BarChart></ResponsiveContainer></CardContent></Card></TabsContent></Tabs></div></DashboardLayout>;
}
export {
  AdminAnalytics
};

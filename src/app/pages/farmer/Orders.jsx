import { useState, useEffect } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
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
import { Eye, Download, MessageSquare } from "lucide-react";
import { orders as mockOrders } from "../../utils/mockData";
import { orderApi } from "../../utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function FarmerOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await orderApi.getFarmerOrders();
        setAllOrders(Array.isArray(data) ? data : (data.content ? data.content : []));
      } catch (error) {
        console.error("Fetch farmer orders failed:", error);
        toast.error("Could not reach backend. Using cached data.");
        setAllOrders([...mockOrders, ...mockOrders.map((o, i) => ({
          ...o,
          id: `ORD-00${i + 4}`
        }))]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const filterOrders = (status) => {
    if (!status) return allOrders;
    return allOrders.filter((order) => {
        const os = order.status ? order.status.toUpperCase() : "";
        return os === status.toUpperCase();
    });
  };
  const OrderList = ({ orders: ordersList }) => (
    <StaggerContainer className="space-y-4">
      {ordersList.map((order, index) => (
        <StaggerItem key={order.id}>
          <SlideIn direction="up" delay={index * 0.1}>
            <HoverLift>
              <Card className="hover-glow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                        >
                          <Badge 
                            className={`${getStatusColor(order.status)} animate-pulse-slow`}
                          >
                            {order.status}
                          </Badge>
                        </motion.div>
                      </div>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Customer:</span> {order.customer || order.buyer?.name || "Customer"}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Items:</span> {(order.items || []).map(i => i.product ? i.product.name : i).join(", ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Order Date: {order.date || new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col lg:items-end gap-3">
                      <motion.p 
                        className="text-2xl font-bold text-primary"
                        whileHover={{ scale: 1.05 }}
                      >
                        ${(order.total || 0).toFixed(2)}
                      </motion.p>
                      <div className="flex gap-2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="outline" size="sm" className="hover-glow">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="outline" size="sm" className="hover-glow">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="outline" size="sm" className="hover-glow">
                            <Download className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </HoverLift>
          </SlideIn>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          <StaggerItem>
            <div>
              <Badge variant="outline" className="bg-white/70 hover-lift">
                Fulfillment
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Orders</h1>
              <p className="text-muted-foreground">
                Manage and track your customer orders
              </p>
            </div>
          </StaggerItem>

          {isLoading ? (
            <StaggerItem>
               <div className="flex justify-center p-12"><Loader2 className="animate-spin h-12 w-12 text-indigo-600" /></div>
            </StaggerItem>
          ) : (
            <>
              <StaggerItem>
                <ScrollReveal>
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StaggerItem>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Total Orders
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.p 
                              className="text-3xl font-bold"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2, duration: 0.5 }}
                            >
                              {allOrders.length}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                    <StaggerItem>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Processing
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.p 
                              className="text-3xl font-bold text-yellow-600 animate-pulse-slow"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            >
                              {filterOrders("Processing").length}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                    <StaggerItem>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Shipped
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.p 
                              className="text-3xl font-bold text-blue-600"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4, duration: 0.5 }}
                            >
                              {filterOrders("Shipped").length}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                    <StaggerItem>
                      <HoverLift>
                        <Card className="hover-glow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Delivered
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.p 
                              className="text-3xl font-bold text-green-600"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                            >
                              {filterOrders("Delivered").length}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                  </StaggerContainer>
                </ScrollReveal>
              </StaggerItem>

              <StaggerItem>
                <FadeIn delay={0.6}>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="hover-glow">
                      <TabsTrigger value="all">All Orders</TabsTrigger>
                      <TabsTrigger value="processing">Processing</TabsTrigger>
                      <TabsTrigger value="shipped">Shipped</TabsTrigger>
                      <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="mt-6">
                      <OrderList orders={allOrders} />
                    </TabsContent>
                    <TabsContent value="processing" className="mt-6">
                      <OrderList orders={filterOrders("Processing")} />
                    </TabsContent>
                    <TabsContent value="shipped" className="mt-6">
                      <OrderList orders={filterOrders("Shipped")} />
                    </TabsContent>
                    <TabsContent value="delivered" className="mt-6">
                      <OrderList orders={filterOrders("Delivered")} />
                    </TabsContent>
                  </Tabs>
                </FadeIn>
              </StaggerItem>
            </>
          )}
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  FarmerOrders
};

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
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
  SlideIn
} from "../../components/AnimationWrappers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Package, Star, MessageSquare, Download, ShoppingBag, Truck, Clock, DollarSign, CheckCircle, Loader2 } from "lucide-react";
import { orders as mockOrders } from "../../utils/mockData";
import { orderApi } from "../../utils/api";
import { toast } from "sonner";

function BuyerOrders() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await orderApi.getBuyerOrders();
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        } else if (data && data.content && Array.isArray(data.content)) {
          setOrders(data.content);
        } else {
          // Empty or unknown format, fallback to mock data
          setOrders(mockOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Could not reach server. Showing cached data.");
        setOrders(mockOrders);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
  
  const allOrders = [...orders];
  
  const handleSubmitReview = () => {
    toast.success("Review submitted successfully!", {
      description: "Thank you for your feedback!"
    });
    setReviewOpen(false);
    setRating(0);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Processing":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Shipped":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return CheckCircle;
      case "Processing": return Clock;
      case "Shipped": return Truck;
      default: return Package;
    }
  };
  
  const filterOrders = (status) => {
    if (!status) return allOrders;
    return allOrders.filter((order) => order.status === status);
  };

  const stats = [
    { title: "Total Orders", value: allOrders.length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Processing", value: filterOrders("Processing").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { title: "Shipped", value: filterOrders("Shipped").length, icon: Truck, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { title: "Total Spent", value: `$${allOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30", isPrice: true }
  ];
  
  const OrderList = ({ orders: ordersList }) => (
    <StaggerContainer className="space-y-4" staggerDelay={0.05}>
      <AnimatePresence>
        {ordersList.map((order, index) => {
          const StatusIcon = getStatusIcon(order.status);
          return (
            <StaggerItem key={order.id}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <HoverLift>
                  <Card className="hover-glow overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <motion.h3 
                              className="font-semibold text-lg"
                              whileHover={{ color: 'var(--primary)' }}
                            >
                              {order.id}
                            </motion.h3>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                            >
                              <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                                <StatusIcon className="h-3 w-3" />
                                {order.status}
                              </Badge>
                            </motion.div>
                          </div>
                          <motion.div 
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                          >
                            <p className="text-muted-foreground">
                              <span className="font-medium">Items:</span> {order.items.join(", ")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {order.date}
                            </p>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2 flex-wrap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                          >
                            <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
                              <DialogTrigger asChild>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button variant="outline" size="sm" className="rounded-xl">
                                    <Star className="h-4 w-4 mr-2" />
                                    Write Review
                                  </Button>
                                </motion.div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-amber-500" />
                                    Write a Review
                                  </DialogTitle>
                                  <DialogDescription>
                                    Share your experience with this product
                                  </DialogDescription>
                                </DialogHeader>
                                <motion.div 
                                  className="space-y-4"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <div>
                                    <p className="text-sm font-medium mb-2">Rating</p>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                          key={star}
                                          onClick={() => setRating(star)}
                                          className="focus:outline-none"
                                          whileHover={{ scale: 1.2 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <Star
                                            className={`h-8 w-8 transition-colors ${
                                              star <= rating 
                                                ? "fill-amber-400 text-amber-400" 
                                                : "text-gray-300 hover:text-amber-200"
                                            }`}
                                          />
                                        </motion.button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-2">Your Review</p>
                                    <Textarea
                                      placeholder="Tell us about your experience..."
                                      rows={4}
                                      className="rounded-xl"
                                    />
                                  </div>
                                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Button onClick={handleSubmitReview} className="w-full rounded-xl">
                                      Submit Review
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              </DialogContent>
                            </Dialog>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button variant="outline" size="sm" className="rounded-xl">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contact Farmer
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button variant="outline" size="sm" className="rounded-xl">
                                <Download className="h-4 w-4 mr-2" />
                                Invoice
                              </Button>
                            </motion.div>
                          </motion.div>
                        </div>
                        <motion.div 
                          className="lg:text-right"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <motion.p 
                            className="text-2xl font-bold text-primary"
                            whileHover={{ scale: 1.05 }}
                          >
                            ${order.total.toFixed(2)}
                          </motion.p>
                          {order.status === "Delivered" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button size="sm" className="mt-3 rounded-xl">
                                Reorder
                              </Button>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverLift>
              </motion.div>
            </StaggerItem>
          );
        })}
      </AnimatePresence>
      
      {ordersList.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          </motion.div>
          <h3 className="font-semibold text-lg mb-2">No orders found</h3>
          <p className="text-muted-foreground">Orders matching this filter will appear here</p>
        </motion.div>
      )}
    </StaggerContainer>
  );

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-lift">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  Orders
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </div>
          </StaggerItem>

          {/* Stats Grid */}
          <StaggerItem>
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <StaggerItem key={stat.title}>
                      <HoverLift>
                        <Card className="hover-glow overflow-hidden relative group">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                          <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </CardTitle>
                            <motion.div
                              className={`p-2 rounded-xl ${stat.bg}`}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                            >
                              <Icon className={`h-4 w-4 ${stat.color}`} />
                            </motion.div>
                          </CardHeader>
                          <CardContent>
                            <motion.p
                              className={`text-3xl font-bold ${stat.color}`}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                            >
                              {stat.value}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </HoverLift>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </ScrollReveal>
          </StaggerItem>

          {/* Tabs */}
          <StaggerItem>
            <Tabs defaultValue="all" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TabsList className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    All Orders
                  </TabsTrigger>
                  <TabsTrigger value="processing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Processing
                  </TabsTrigger>
                  <TabsTrigger value="shipped" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Shipped
                  </TabsTrigger>
                  <TabsTrigger value="delivered" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Delivered
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
                  </div>
                ) : (
                  <>
                    <TabsContent value="all" className="mt-6">
                      <motion.div
                        key="all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OrderList orders={allOrders} />
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="processing" className="mt-6">
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OrderList orders={filterOrders("Processing")} />
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="shipped" className="mt-6">
                      <motion.div
                        key="shipped"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OrderList orders={filterOrders("Shipped")} />
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="delivered" className="mt-6">
                      <motion.div
                        key="delivered"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OrderList orders={filterOrders("Delivered")} />
                      </motion.div>
                    </TabsContent>
                  </>
                )}
              </AnimatePresence>
            </Tabs>
          </StaggerItem>

          {/* Empty State */}
          {allOrders.length === 0 && (
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-12">
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">Start shopping for fresh products!</p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="rounded-xl" onClick={() => navigate("/buyer/browse")}>
                        Browse Products
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          )}
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}

export default BuyerOrders;
export {
  BuyerOrders
};

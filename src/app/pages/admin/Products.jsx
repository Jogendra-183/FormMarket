import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
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
import { Search, Check, X, Flag, MoreVertical, Package, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { products as mockProducts } from "../../utils/mockData";
import { toast } from "sonner";
import { productApi } from "../../utils/api";
import { Loader2 } from "lucide-react";

function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productApi.getAll(0, 100);
      if (Array.isArray(data)) {
        setAllProducts(data);
      } else if (data && Array.isArray(data.content)) {
        setAllProducts(data.content);
      } else {
        setAllProducts(mockProducts);
      }
    } catch (error) {
      console.error("Fetch all products failed:", error);
      toast.error("Could not reach backend. Using cached products.");
      setAllProducts([
        ...mockProducts,
        ...mockProducts.map((p, i) => ({
          ...p,
          id: `${parseInt(p.id) + 6}`,
          name: `Product ${i + 7}`,
          status: i % 2 === 0 ? "approved" : "pending"
        }))
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleApprove = (productId, productName) => {
    // In a real app we would call productApi.approveProduct(productId)
    setAllProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'approved' } : p));
    toast.success(`${productName} approved!`, {
      description: "The product is now visible to buyers"
    });
  };
  
  const handleReject = (productId, productName) => {
    // In a real app we would call productApi.rejectProduct(productId)
    setAllProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'rejected' } : p));
    toast.error(`${productName} rejected`, {
      description: "The farmer will be notified"
    });
  };
  
  const handleFlag = (productId, productName) => {
    setAllProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'flagged' } : p));
    toast.warning(`${productName} flagged for review`, {
      description: "The product has been marked for further review"
    });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "flagged":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return CheckCircle;
      case "pending": return Clock;
      case "rejected": return X;
      case "flagged": return AlertTriangle;
      default: return Package;
    }
  };
  
  const filterProducts = (status) => {
    let filtered = allProducts;
    if (status && status !== "all") {
      filtered = filtered.filter((p) => p.status === status);
    }
    if (searchQuery) {
      filtered = filtered.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const stats = [
    { title: "Total Products", value: allProducts.length, icon: Package, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Approved", value: filterProducts("approved").length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { title: "Pending Review", value: filterProducts("pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { title: "Flagged", value: filterProducts("flagged").length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" }
  ];
  
  const ProductGrid = ({ products: productList }) => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      layout
    >
      <AnimatePresence>
        {productList.map((product, index) => {
          const StatusIcon = getStatusIcon(product.status || "approved");
          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <HoverLift>
                <Card className="overflow-hidden hover-glow group h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <Badge className={`absolute top-3 right-3 ${getStatusColor(product.status || "approved")} flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {product.status || "approved"}
                      </Badge>
                    </motion.div>
                  </div>
                  <CardHeader>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.farmerName || product.farmer?.name || "Unknown Farmer"}</p>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <p className="text-2xl font-bold text-primary">${product.price}</p>
                        <p className="text-xs text-muted-foreground">per {product.unit}</p>
                      </motion.div>
                      <motion.div
                        className="text-right"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className="font-semibold">{product.stock} {product.unit}</p>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      {(!product.status || product.status === "pending") && (
                        <>
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => handleApprove(product.id, product.name)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:bg-rose-50 dark:hover:bg-red-950"
                              onClick={() => handleReject(product.id, product.name)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleFlag(product.id, product.name)} className="cursor-pointer">
                            <Flag className="h-4 w-4 mr-2 text-amber-600" />
                            Flag for Review
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 cursor-pointer">
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  </CardContent>
                </Card>
              </HoverLift>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {productList.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-full text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          </motion.div>
          <h3 className="font-semibold text-lg mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </motion.div>
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
                <Badge variant="outline" className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 hover-lift">
                  <Package className="h-3 w-3 mr-1" />
                  Moderation
                </Badge>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Product Moderation</h1>
              <p className="text-muted-foreground">Review and manage product listings</p>
            </div>
          </StaggerItem>

          {/* Stats */}
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

          {/* Search */}
          <StaggerItem>
            <SlideIn direction="up" delay={0.2}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products or farmers..." 
                  className="pl-10 rounded-xl transition-all focus:ring-2 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </SlideIn>
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
                    All Products
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Pending Review
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Approved
                  </TabsTrigger>
                  <TabsTrigger value="flagged" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Flagged
                  </TabsTrigger>
                </TabsList>
               </motion.div>

              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin h-12 w-12 text-amber-600" /></div>
              ) : (
              <AnimatePresence mode="wait">
                <TabsContent value="all" className="mt-6">
                  <motion.div
                    key="all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductGrid products={filterProducts("all")} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="pending" className="mt-6">
                  <motion.div
                    key="pending"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductGrid products={filterProducts("pending")} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="approved" className="mt-6">
                  <motion.div
                    key="approved"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductGrid products={filterProducts("approved")} />
                  </motion.div>
                </TabsContent>
                <TabsContent value="flagged" className="mt-6">
                  <motion.div
                    key="flagged"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductGrid products={filterProducts("flagged")} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
              )}
            </Tabs>
          </StaggerItem>
        </StaggerContainer>
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  AdminProducts
};

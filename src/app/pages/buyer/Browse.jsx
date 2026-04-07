import { useState, useEffect } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { Filter, Heart, Search, ShoppingCart, Sparkles, Star, Loader2 } from "lucide-react";
import { products as mockDataProducts } from "../../utils/mockData";
import { productApi } from "../../utils/api";
import { useCart } from "../../contexts/CartContext";
import { toast } from "sonner";

function BuyerBrowse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [savedIds, setSavedIds] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Using getAll which defaults to page 0, size 12
        const responseData = await productApi.getAll();
        // Adjust for Spring Data pageable structure if returned (content array usually)
        const items = responseData.content ? responseData.content : responseData;
        
        // If empty or strange response, we could fallback, but let's assume it succeeded if it gets here
        if (Array.isArray(items) && items.length > 0) {
          setProducts(items);
        } else {
          // If the backend returns no products, we can show mock data or empty state
          // For now, let's show mock data so the app looks populated
          setProducts(mockDataProducts);
          console.log("No remote products found, falling back to mock data");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Could not reach server. Showing cached data.");
        setProducts(mockDataProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Map backend fields to frontend fields safely
    const nameStr = (product.name || "").toLowerCase();
    const descStr = (product.description || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = nameStr.includes(query) || descStr.includes(query);
    
    // Some backend products might not have category, default to "all"
    const prodCategory = (product.category || "all").toLowerCase();
    const matchesCategory = category === "all" || prodCategory === category;
    
    const matchesSaved = !showSaved || savedIds.includes(product.id);
    
    return matchesSearch && matchesCategory && matchesSaved;
  });

  const handleAddToCart = (product) => {
    addToCart({
      id: Math.random().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
      farmerId: product.farmerId || product.farmer?.id,
      farmerName: product.farmerName || product.farmer?.farmName || "Unknown Farmer",
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`);
  };

  const toggleSaved = (productId) => {
    setSavedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Taking first 3 for AI recommendations from fetched products
  const aiRecommendations = products.slice(0, 3);
  
  const getProductImage = (product) => {
     return product.imageUrl || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-3">
            Marketplace
          </Badge>
          <h1 className="text-4xl font-black mb-2">Browse Products</h1>
          <p className="text-muted-foreground text-lg">
            Fresh, local products from verified farmers
          </p>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                </motion.div>
                <CardTitle className="text-2xl font-black">Curated for You</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiRecommendations.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="bg-white/80 dark:bg-black/20 p-4 rounded-2xl border border-black/5 dark:border-white/5 hover:shadow-lg transition-all">
                      <motion.img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-xl mb-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      <h4 className="font-bold mb-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${product.price}/{product.unit}
                      </p>
                      <Button
                        size="sm"
                        className="w-full rounded-xl"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🏪 All Categories</SelectItem>
                <SelectItem value="vegetables">🥬 Vegetables</SelectItem>
                <SelectItem value="fruits">🍎 Fruits</SelectItem>
                <SelectItem value="dairy & eggs">🥛 Dairy & Eggs</SelectItem>
                <SelectItem value="pantry">🥫 Pantry</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showSaved ? "default" : "outline"}
              size="default"
              onClick={() => setShowSaved((prev) => !prev)}
              className="rounded-xl"
            >
              <Heart
                className={`h-4 w-4 mr-2 ${savedIds.length > 0 ? "fill-current" : ""}`}
              />
              Saved ({savedIds.length})
            </Button>
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border bg-card overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-muted rounded animate-pulse w-full" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-8 bg-muted rounded animate-pulse w-20" />
                    <div className="h-10 bg-muted rounded-xl animate-pulse w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const isSaved = savedIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <Card hover glow className="overflow-hidden h-full flex flex-col group">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.button
                      onClick={() => toggleSaved(product.id)}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black transition-all shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          isSaved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </motion.button>
                    <Badge className="absolute bottom-3 left-3 bg-indigo-600 hover:bg-indigo-600 shadow-lg">
                      {product.category || "General"}
                    </Badge>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-black text-lg group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            by {product.farmerName || (product.farmer && product.farmer.farmName) || "Local Farm"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{product.rating || "5.0"}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description || "Fresh from the farm, delivered to your door."}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ${product.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            per {product.unit || "unit"}
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleAddToCart(product)} 
                          className="rounded-xl group/btn"
                          magnetic
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
                          Add
                        </Button>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                            style={{ width: `${Math.min(100, ((product.stock || product.quantityAvailable || 50) / 100) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {product.stock || product.quantityAvailable || 50} left
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        )}

        {/* No Results */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-xl"
                onClick={() => { setSearchQuery(''); setCategory('all'); setShowSaved(false); }}
              >
                Clear all filters
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

export { BuyerBrowse };

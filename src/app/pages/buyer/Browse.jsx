import { useState } from "react";
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
import { Filter, Heart, Search, ShoppingCart, Sparkles, Star } from "lucide-react";
import { products } from "../../utils/mockData";
import { useCart } from "../../contexts/CartContext";
import { toast } from "sonner";

function BuyerBrowse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [savedIds, setSavedIds] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category.toLowerCase() === category;
    const matchesSaved = !showSaved || savedIds.includes(product.id);
    return matchesSearch && matchesCategory && matchesSaved;
  });

  const handleAddToCart = (product) => {
    addToCart({
      id: Math.random().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      farmerId: product.farmerId,
      farmerName: product.farmerName,
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

  const aiRecommendations = products.slice(0, 3);

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
                        src={product.image}
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
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="dairy & eggs">Dairy & Eggs</SelectItem>
                <SelectItem value="pantry">Pantry</SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const isSaved = savedIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.button
                      onClick={() => toggleSaved(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isSaved ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </motion.button>
                    <Badge className="absolute bottom-3 left-3 bg-indigo-600 hover:bg-indigo-600">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-black text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {product.farmerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                          ${product.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          per {product.unit}
                        </p>
                      </div>
                      <Button onClick={() => handleAddToCart(product)} className="rounded-xl">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {product.stock} {product.unit} in stock
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

export { BuyerBrowse };

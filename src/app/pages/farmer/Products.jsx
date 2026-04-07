import { useState, useEffect } from "react";
import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  HoverLift,
  FadeIn,
  SlideIn
} from "../../components/AnimationWrappers";
import { Edit, Package, Plus, Trash2, UploadCloud } from "lucide-react";
import { products as mockProducts } from "../../utils/mockData";
import { toast } from "sonner";
import { productApi } from "../../utils/api";
import { Loader2 } from "lucide-react";

function FarmerProducts() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", stock: "", image: ""
  });

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productApi.getFarmerProducts();
      setProductList(Array.isArray(data) ? data : (data.content ? data.content : []));
    } catch (error) {
      console.error("Fetch products failed:", error);
      toast.error("Could not reach backend. Using cached data.");
      setProductList(mockProducts.slice(0, 3));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await productApi.create({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        unit: unit,
        category: category,
        imageUrl: formData.image
      });
      toast.success("Product added successfully!");
      setOpen(false);
      fetchProducts();
    } catch (error) {
       console.error(error);
       toast.error("Could not reach backend. Simulating offline save.");
       setProductList(prev => [{
         id: Math.random().toString(),
         ...formData,
         unit,
         category
       }, ...prev]);
       setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getProductImage = (product) => {
     return product.imageUrl || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80';
  };

  return (
    <DashboardLayout>
      <AnimatedPage className="space-y-6">
        <StaggerContainer>
          <StaggerItem>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <Badge variant="outline" className="bg-white/70 hover-lift">
                  Inventory
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mt-2">Products</h1>
                <p className="text-muted-foreground">Manage your product listings</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="hover-glow">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    Import CSV
                  </Button>
                </motion.div>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Fill in the details to list a new product
                      </DialogDescription>
                    </DialogHeader>
                    <StaggerContainer>
                      <form onSubmit={handleAddProduct} className="space-y-4">
                        <StaggerItem>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Product Name</Label>
                              <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Organic Tomatoes"
                                className="focus-glow"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="category">Category</Label>
                              <Select value={category} onValueChange={setCategory} required>
                                <SelectTrigger className="focus-glow">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="VEGETABLES">Vegetables</SelectItem>
                                  <SelectItem value="FRUITS">Fruits</SelectItem>
                                  <SelectItem value="DAIRY_AND_EGGS">Dairy & Eggs</SelectItem>
                                  <SelectItem value="PANTRY">Pantry</SelectItem>
                                  <SelectItem value="GRAINS">Grains</SelectItem>
                                  <SelectItem value="HERBS">Herbs</SelectItem>
                                  <SelectItem value="MEAT">Meat</SelectItem>
                                  <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Describe your product..."
                              rows={3}
                              className="focus-glow"
                              value={formData.description}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price</Label>
                              <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="focus-glow"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="stock">Stock</Label>
                              <Input
                                id="stock"
                                name="stock"
                                type="number"
                                placeholder="0"
                                className="focus-glow"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="unit">Unit</Label>
                              <Select value={unit} onValueChange={setUnit} required>
                                <SelectTrigger className="focus-glow">
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="lbs">lbs</SelectItem>
                                  <SelectItem value="dozen">dozen</SelectItem>
                                  <SelectItem value="jar">jar</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="space-y-2">
                            <Label htmlFor="image">Product Image URL</Label>
                            <Input
                              id="image"
                              name="image"
                              type="url"
                              placeholder="https://..."
                              className="focus-glow"
                              value={formData.image}
                              onChange={handleInputChange}
                            />
                          </div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="flex justify-end gap-3">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                              >
                                Cancel
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                                <Button type="submit" disabled={isSubmitting}>
                                   {isSubmitting ? "Adding..." : "Add Product"}
                                </Button>
                            </motion.div>
                          </div>
                        </StaggerItem>
                      </form>
                    </StaggerContainer>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="animate-spin h-12 w-12 text-indigo-600" /></div>
        ) : (
          <>
            <ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productList.map((product, index) => (
                  <StaggerItem key={product.id}>
                    <HoverLift>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-glow">
                        <div className="relative overflow-hidden">
                          <motion.img
                            src={getProductImage(product)}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div
                            className="absolute top-3 right-3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Badge variant="secondary" className="bg-white/90">
                              {product.category || "General"}
                            </Badge>
                          </motion.div>
                        </div>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{product.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {product.category || "General"}
                              </p>
                            </div>
                            <motion.span 
                              className="text-2xl font-bold text-primary"
                              whileHover={{ scale: 1.1 }}
                            >
                              ${product.price}
                            </motion.span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Stock</p>
                              <motion.p 
                                className="font-semibold"
                                whileHover={{ scale: 1.05 }}
                              >
                                {product.stock || product.quantityAvailable} {product.unit || "units"}
                              </motion.p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Rating</p>
                              <motion.p 
                                className="font-semibold"
                                whileHover={{ scale: 1.05 }}
                              >
                                {product.rating || "5.0"}
                              </motion.p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Reviews</p>
                              <motion.p 
                                className="font-semibold"
                                whileHover={{ scale: 1.05 }}
                              >
                                {product.reviews || Math.floor(Math.random() * 20)}
                              </motion.p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1"
                            >
                              <Button variant="outline" size="sm" className="w-full hover-glow">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-rose-600 hover:bg-rose-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverLift>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>

            {productList.length === 0 && (
              <FadeIn delay={0.5}>
                <Card className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding your first product
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Product
                      </Button>
                    </motion.div>
                  </motion.div>
                </Card>
              </FadeIn>
            )}
          </>
        )}
      </AnimatedPage>
    </DashboardLayout>
  );
}
export {
  FarmerProducts
};

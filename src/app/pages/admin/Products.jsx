import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Search, Check, X, Flag, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { products } from "../../utils/mockData";
import { toast } from "sonner";
function AdminProducts() {
  const allProducts = [
    ...products,
    ...products.map((p, i) => ({
      ...p,
      id: `${parseInt(p.id) + 6}`,
      name: `Product ${i + 7}`,
      status: i % 2 === 0 ? "approved" : "pending"
    }))
  ];
  const handleApprove = (productId) => {
    toast.success("Product approved");
  };
  const handleReject = (productId) => {
    toast.success("Product rejected");
  };
  const handleFlag = (productId) => {
    toast.success("Product flagged for review");
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-primary/10 text-primary";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const filterProducts = (status) => {
    if (!status || status === "all") return allProducts;
    return allProducts.filter((p) => p.status === status);
  };
  const ProductGrid = ({ products: products2 }) => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{products2.map((product) => <Card key={product.id} className="overflow-hidden"><div className="relative"><img
    src={product.image}
    alt={product.name}
    className="w-full h-48 object-cover"
  /><Badge className={`absolute top-3 right-3 ${getStatusColor(product.status || "approved")}`}>{product.status || "approved"}</Badge></div><CardHeader><CardTitle className="text-lg">{product.name}</CardTitle><p className="text-sm text-muted-foreground">{product.farmerName}</p></CardHeader><CardContent><p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p><div className="flex items-center justify-between mb-4"><div><p className="text-2xl font-bold text-primary">${product.price}</p><p className="text-xs text-muted-foreground">per {product.unit}</p></div><div className="text-right"><p className="text-sm text-muted-foreground">Stock</p><p className="font-semibold">{product.stock} {product.unit}</p></div></div><div className="flex gap-2">{(!product.status || product.status === "pending") && <><Button
    size="sm"
    className="flex-1"
    onClick={() => handleApprove(product.id)}
  ><Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button><Button
    size="sm"
    variant="outline"
    className="text-red-600 hover:bg-rose-50"
    onClick={() => handleReject(product.id)}
  ><X className="h-4 w-4" /></Button></>}<DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onClick={() => handleFlag(product.id)}><Flag className="h-4 w-4 mr-2" />
                    Flag
                  </DropdownMenuItem><DropdownMenuItem className="text-red-600"><X className="h-4 w-4 mr-2" />
                    Remove
                  </DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></CardContent></Card>)}</div>;
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Moderation</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">Product Moderation</h1><p className="text-muted-foreground">Review and manage product listings</p></div>{
    /* Stats */
  }<div className="grid grid-cols-1 md:grid-cols-4 gap-4"><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{allProducts.length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Approved
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary">{filterProducts("approved").length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-yellow-600">{filterProducts("pending").length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Flagged
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-red-600">{filterProducts("flagged").length}</p></CardContent></Card></div>{
    /* Filters */
  }<div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search products..." className="pl-10" /></div><Tabs defaultValue="all" className="w-full"><TabsList><TabsTrigger value="all">All Products</TabsTrigger><TabsTrigger value="pending">Pending Review</TabsTrigger><TabsTrigger value="approved">Approved</TabsTrigger><TabsTrigger value="flagged">Flagged</TabsTrigger></TabsList><TabsContent value="all" className="mt-6"><ProductGrid products={allProducts} /></TabsContent><TabsContent value="pending" className="mt-6"><ProductGrid products={filterProducts("pending")} /></TabsContent><TabsContent value="approved" className="mt-6"><ProductGrid products={filterProducts("approved")} /></TabsContent><TabsContent value="flagged" className="mt-6"><ProductGrid products={filterProducts("flagged")} /></TabsContent></Tabs></div></DashboardLayout>;
}
export {
  AdminProducts
};

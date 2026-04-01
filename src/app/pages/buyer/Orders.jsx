import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Package, Star, MessageSquare, Download } from "lucide-react";
import { orders } from "../../utils/mockData";
import { toast } from "sonner";
function BuyerOrders() {
  const [rating, setRating] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const allOrders = [...orders, ...orders.map((o, i) => ({
    ...o,
    id: `ORD-00${i + 4}`
  }))];
  const handleSubmitReview = () => {
    toast.success("Review submitted successfully!");
    setReviewOpen(false);
    setRating(0);
  };
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
    return allOrders.filter((order) => order.status === status);
  };
  const OrderList = ({ orders: orders2 }) => <div className="space-y-4">{orders2.map((order) => <Card key={order.id}><CardContent className="p-6"><div className="flex flex-col lg:flex-row gap-4"><div className="flex-1 space-y-3"><div className="flex items-center gap-3 flex-wrap"><h3 className="font-semibold text-lg">{order.id}</h3><Badge className={getStatusColor(order.status)}>{order.status}</Badge></div><div className="space-y-1"><p className="text-muted-foreground"><span className="font-medium">Items:</span> {order.items.join(", ")}</p><p className="text-sm text-muted-foreground">
                    Ordered on {order.date}</p></div><div className="flex items-center gap-2 flex-wrap"><Dialog open={reviewOpen} onOpenChange={setReviewOpen}><DialogTrigger asChild><Button variant="outline" size="sm"><Star className="h-4 w-4 mr-2" />
                        Write Review
                      </Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Write a Review</DialogTitle><DialogDescription>
                          Share your experience with this product
                        </DialogDescription></DialogHeader><div className="space-y-4"><div><p className="text-sm font-medium mb-2">Rating</p><div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => <button
    key={star}
    onClick={() => setRating(star)}
    className="focus:outline-none"
  ><Star
    className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
  /></button>)}</div></div><div><p className="text-sm font-medium mb-2">Your Review</p><Textarea
    placeholder="Tell us about your experience..."
    rows={4}
  /></div><Button
    onClick={handleSubmitReview}
    className="w-full"
  >
                          Submit Review
                        </Button></div></DialogContent></Dialog><Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-2" />
                    Contact Farmer
                  </Button><Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />
                    Invoice
                  </Button></div></div><div className="lg:text-right"><p className="text-2xl font-bold text-primary">
                  ${order.total.toFixed(2)}</p>{order.status === "Delivered" && <Button size="sm" className="mt-3">
                    Reorder
                  </Button>}</div></div></CardContent></Card>)}</div>;
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Orders</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">My Orders</h1><p className="text-muted-foreground">Track and manage your orders</p></div>{
    /* Stats */
  }<div className="grid grid-cols-1 md:grid-cols-4 gap-4"><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{allOrders.length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Processing
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-yellow-600">{filterOrders("Processing").length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Shipped
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-blue-600">{filterOrders("Shipped").length}</p></CardContent></Card><Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary">
                ${allOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p></CardContent></Card></div><Tabs defaultValue="all" className="w-full"><TabsList><TabsTrigger value="all">All Orders</TabsTrigger><TabsTrigger value="processing">Processing</TabsTrigger><TabsTrigger value="shipped">Shipped</TabsTrigger><TabsTrigger value="delivered">Delivered</TabsTrigger></TabsList><TabsContent value="all" className="mt-6"><OrderList orders={allOrders} /></TabsContent><TabsContent value="processing" className="mt-6"><OrderList orders={filterOrders("Processing")} /></TabsContent><TabsContent value="shipped" className="mt-6"><OrderList orders={filterOrders("Shipped")} /></TabsContent><TabsContent value="delivered" className="mt-6"><OrderList orders={filterOrders("Delivered")} /></TabsContent></Tabs>{allOrders.length === 0 && <Card className="p-12"><div className="text-center"><Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold mb-2">No orders yet</h3><p className="text-muted-foreground">Start shopping for fresh products!</p></div></Card>}</div></DashboardLayout>;
}
export {
  BuyerOrders
};

import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Check, Crown, Gift, Zap } from "lucide-react";
import { subscriptionPlans } from "../../utils/mockData";
import { toast } from "sonner";
function BuyerSubscription() {
  const currentPlan = "premium";
  const handleSubscribe = (planId) => {
    toast.success(`Successfully subscribed to ${planId} plan!`);
  };
  const handleCancel = () => {
    toast.success("Subscription cancelled. Will remain active until end of billing period.");
  };
  return <DashboardLayout><div className="space-y-6"><div><Badge variant="outline" className="bg-white/70">Membership</Badge><h1 className="text-3xl md:text-4xl font-bold mt-2">Subscription</h1><p className="text-muted-foreground">Manage your subscription and billing</p></div>{
    /* Current Plan */
  }<Card className="bg-gradient-to-r from-amber-50 to-emerald-50 border-primary/20"><CardHeader><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Crown className="h-6 w-6 text-primary" /><div><CardTitle>Current Plan: Premium</CardTitle><CardDescription>Your subscription is active</CardDescription></div></div><Badge className="bg-primary text-primary-foreground">Active</Badge></div></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><p className="text-sm text-muted-foreground">Monthly Cost</p><p className="text-2xl font-bold">$19.99</p></div><div><p className="text-sm text-muted-foreground">Next Billing Date</p><p className="text-lg font-semibold">April 28, 2026</p></div><div><p className="text-sm text-muted-foreground">Member Since</p><p className="text-lg font-semibold">January 2025</p></div></div><div className="flex gap-3 mt-6"><Button variant="outline">Change Plan</Button><Button variant="outline" className="text-rose-600 hover:bg-rose-50" onClick={handleCancel}>
                Cancel Subscription
              </Button></div></CardContent></Card>{
    /* Benefits */
  }<Card><CardHeader><CardTitle>Your Benefits</CardTitle><CardDescription>Active perks with your Premium subscription</CardDescription></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="flex items-start gap-3 p-4 border rounded-2xl bg-white/70"><Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold">Priority Shipping</h4><p className="text-sm text-muted-foreground">
                    Get your orders delivered faster with priority handling
                  </p></div></div><div className="flex items-start gap-3 p-4 border rounded-2xl bg-white/70"><Gift className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold">10% Off All Orders</h4><p className="text-sm text-muted-foreground">
                    Automatic discount applied at checkout
                  </p></div></div><div className="flex items-start gap-3 p-4 border rounded-2xl bg-white/70"><Crown className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold">Early Access</h4><p className="text-sm text-muted-foreground">
                    Be first to know about new products and exclusive deals
                  </p></div></div><div className="flex items-start gap-3 p-4 border rounded-2xl bg-white/70"><Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold">AI Recommendations</h4><p className="text-sm text-muted-foreground">
                    Personalized product suggestions based on your preferences
                  </p></div></div></div></CardContent></Card>{
    /* All Plans */
  }<div><h2 className="text-2xl font-bold mb-6">All Plans</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{subscriptionPlans.map((plan) => <Card
    key={plan.id}
    className={`relative ${plan.popular ? "border-primary border-2 shadow-lg" : ""} ${plan.id === currentPlan ? "bg-white/70" : ""}`}
  >{plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground">Most Popular</Badge></div>}{plan.id === currentPlan && <div className="absolute -top-4 right-4"><Badge className="bg-emerald-600">Current Plan</Badge></div>}<CardHeader><CardTitle>{plan.name}</CardTitle><div className="mt-4"><span className="text-4xl font-bold">${plan.price}</span><span className="text-muted-foreground">/{plan.interval}</span></div></CardHeader><CardContent><ul className="space-y-3 mb-6">{plan.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2"><Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-sm text-foreground/80">{feature}</span></li>)}</ul>{plan.id === currentPlan ? <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button> : <Button
    className="w-full"
    onClick={() => handleSubscribe(plan.id)}
  >{plan.id === "basic" ? "Downgrade" : "Upgrade"}</Button>}</CardContent></Card>)}</div></div>{
    /* Billing History */
  }<Card><CardHeader><CardTitle>Billing History</CardTitle><CardDescription>Your recent transactions</CardDescription></CardHeader><CardContent><div className="space-y-3">{
    { date: "2026-03-01", amount: 19.99, status: "Paid" },
    { date: "2026-02-01", amount: 19.99, status: "Paid" },
    { date: "2026-01-01", amount: 19.99, status: "Paid" }
  ].map((invoice, idx) => <div
    key={idx}
    className="flex items-center justify-between p-4 border rounded-2xl bg-white/70"
  ><div><p className="font-medium">{invoice.date}</p><p className="text-sm text-muted-foreground">Premium Subscription</p></div><div className="flex items-center gap-4"><p className="font-semibold">${invoice.amount}</p><Badge className="bg-emerald-100 text-emerald-700">{invoice.status}</Badge><Button variant="outline" size="sm">
                      Download
                    </Button></div></div>)}</div></CardContent></Card></div></DashboardLayout>;
}
export {
  BuyerSubscription
};

import { motion } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Check, Crown, Gift, Zap, Download, CreditCard, Sparkles } from "lucide-react";
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

  const billingHistory = [
    { date: "2026-03-01", amount: 19.99, status: "Paid" },
    { date: "2026-02-01", amount: 19.99, status: "Paid" },
    { date: "2026-01-01", amount: 19.99, status: "Paid" }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Priority Shipping",
      description: "Get your orders delivered faster with priority handling"
    },
    {
      icon: Gift,
      title: "10% Off All Orders",
      description: "Automatic discount applied at checkout"
    },
    {
      icon: Crown,
      title: "Early Access",
      description: "Be first to know about new products and exclusive deals"
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Personalized product suggestions based on your preferences"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-3">
            Membership
          </Badge>
          <h1 className="text-4xl font-black mb-2">Subscription</h1>
          <p className="text-muted-foreground text-lg">
            Manage your subscription and billing
          </p>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black">Premium Plan</CardTitle>
                    <CardDescription className="text-base">Your subscription is active</CardDescription>
                  </div>
                </div>
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-600 w-fit">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Cost</p>
                  <p className="text-3xl font-black">$19.99</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20">
                  <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
                  <p className="text-xl font-bold">April 28, 2026</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/20">
                  <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                  <p className="text-xl font-bold">January 2025</p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Change Plan
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-xl" 
                  onClick={handleCancel}
                >
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-black">Your Benefits</CardTitle>
              <CardDescription>Active perks with your Premium subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 border rounded-2xl hover:shadow-md transition-all"
                    >
                      <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* All Plans */}
        <div>
          <h2 className="text-3xl font-black mb-6">All Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card
                  className={`relative h-full ${
                    plan.popular ? "border-indigo-500 border-2 shadow-lg" : ""
                  } ${
                    plan.id === currentPlan ? "bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-indigo-600 text-white hover:bg-indigo-600">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  {plan.id === currentPlan && (
                    <div className="absolute -top-4 right-4">
                      <Badge className="bg-emerald-600 hover:bg-emerald-600">
                        Current Plan
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-5xl font-black">${plan.price}</span>
                      <span className="text-muted-foreground text-lg">/{plan.interval}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.id === currentPlan ? (
                      <Button className="w-full rounded-xl" variant="outline" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        className="w-full rounded-xl"
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        {plan.id === "basic" ? "Downgrade" : "Upgrade"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-black">Billing History</CardTitle>
                  <CardDescription>Your recent transactions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billingHistory.map((invoice, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-2xl hover:shadow-md transition-all"
                  >
                    <div>
                      <p className="font-bold text-lg">{invoice.date}</p>
                      <p className="text-sm text-muted-foreground">Premium Subscription</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <p className="font-black text-xl">${invoice.amount}</p>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        {invoice.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export { BuyerSubscription };

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { 
  Check, Crown, Gift, Zap, Download, CreditCard, Sparkles, 
  User, Mail, Phone, MapPin, Building, Calendar, Lock,
  ChevronRight, ChevronLeft, Clock, CheckCircle, AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { subscriptionPlans as mockSubscriptionPlans } from "../../utils/mockData";
import { toast } from "sonner";
import { subscriptionApi } from "../../utils/api";

// Multi-Step Subscription Dialog Component
function SubscriptionUpgradeDialog({ isOpen, onClose, selectedPlan, currentPlan }) {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Pending Approval, 4: Approved
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Payment Details
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null); // null, 'pending', 'approved', 'rejected'

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { fullName, email, phone, address, city, state, zipCode } = formData;
    if (!fullName || !email || !phone || !address || !city || !state || !zipCode) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { cardNumber, cardName, expiryDate, cvv, billingAddress } = formData;
    if (!cardNumber || !cardName || !expiryDate || !cvv || !billingAddress) {
      toast.error("Please fill in all payment details");
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    if (cvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    try {
      // Match backend SubscriptionUpgradeRequest.java
      const upgradeRequest = {
        planType: selectedPlan.name.toUpperCase(), // PREMIUM or ENTERPRISE
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        cardLastFour: formData.cardNumber.replace(/\s/g, '').slice(-4),
        billingAddress: formData.billingAddress
      };
      await subscriptionApi.requestUpgrade(upgradeRequest);
      setRequestStatus('pending');
      setStep(3);
      toast.success("Upgrade request submitted! Waiting for admin approval.");
    } catch (error) {
      console.error("Upgrade request failed:", error);
      toast.error("Could not reach backend. Simulating offline upgrade.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRequestStatus('pending');
      setStep(3);
      toast.success("Upgrade request simulated (offline)!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate admin approval (you can call this when admin approves)
  const simulateAdminApproval = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRequestStatus('approved');
    setStep(4);
    toast.success("Your upgrade request has been approved!");
  };

  const handleFinalPayment = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success(`Successfully upgraded to ${selectedPlan?.name} plan!`);
    onClose();
    // Reset form
    setStep(1);
    setFormData({
      fullName: "", email: "", phone: "", address: "", city: "", state: "", zipCode: "",
      cardNumber: "", cardName: "", expiryDate: "", cvv: "", billingAddress: ""
    });
    setRequestStatus(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setRequestStatus(null);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Upgrade to {selectedPlan?.name}
          </DialogTitle>
          <DialogDescription>
            Complete the steps below to upgrade your subscription
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[
            { num: 1, label: "Details" },
            { num: 2, label: "Payment" },
            { num: 3, label: "Approval" },
            { num: 4, label: "Complete" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > s.num ? <Check size={20} /> : s.num}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  step >= s.num ? 'text-indigo-600' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
              {idx < 3 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  step > s.num ? 'bg-indigo-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep} className="gap-2">
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Payment Information
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                      setFormData({ ...formData, cardNumber: value });
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name *</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="JOHN DOE"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setFormData({ ...formData, expiryDate: value });
                        }}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="cvv"
                        name="cvv"
                        type="password"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="3"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="billingAddress">Billing Address *</Label>
                  <Input
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    placeholder="Same as personal address"
                    className="mt-1"
                  />
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100">
                        Secure Payment
                      </p>
                      <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                        Your payment information is encrypted and will only be processed after admin approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button onClick={handleSubmitRequest} disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pending Admin Approval */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 py-8"
            >
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-amber-600 animate-pulse" />
                </div>
                <h3 className="text-2xl font-black mb-2">Pending Admin Approval</h3>
                <p className="text-muted-foreground mb-6">
                  Your upgrade request has been submitted and is awaiting admin review.
                </p>

                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-left mb-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Request Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan:</span>
                      <span className="font-bold">{selectedPlan?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Cost:</span>
                      <span className="font-bold">${selectedPlan?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-bold">Just now</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        Pending Review
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  You will receive a notification once the admin reviews your request.
                  This usually takes 1-2 business days.
                </p>

                {/* Simulate approval button (for demo purposes) */}
                <div className="border-t pt-6">
                  <p className="text-xs text-muted-foreground mb-3">
                    Demo: Simulate admin approval
                  </p>
                  <Button 
                    onClick={simulateAdminApproval}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <CheckCircle size={16} />
                    Simulate Approval
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Approved - Complete Payment */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 py-8"
            >
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black mb-2">Request Approved!</h3>
                <p className="text-muted-foreground mb-6">
                  Your upgrade request has been approved. Complete the payment to activate your new plan.
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-left mb-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-emerald-600" />
                    {selectedPlan?.name} Plan Summary
                  </h4>
                  <div className="space-y-3">
                    {selectedPlan?.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-3xl font-black text-emerald-600">
                        ${selectedPlan?.price}<span className="text-sm text-muted-foreground">/month</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100">
                        Payment will be processed securely
                      </p>
                      <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                        Card ending in ****{formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleFinalPayment} 
                  disabled={isSubmitting}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  {isSubmitting ? "Processing..." : `Pay $${selectedPlan?.price}`}
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// Main Subscription Page
function BuyerSubscription() {
  const [currentPlan, setCurrentPlan] = useState("basic");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setIsLoading(true);
        const data = await subscriptionApi.getMine();
        if (data && data.planType) {
          setCurrentPlan(data.planType.toLowerCase());
        }
        setSubscriptionPlans(mockSubscriptionPlans); // No plans API yet, use mock for display
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
        toast.error("Could not reach server. Showing cached plan data.");
        // Fallback to basic plan + mock plans
        setCurrentPlan("basic");
        setSubscriptionPlans(mockSubscriptionPlans);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscriptionData();
  }, []);

  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState(null);

  const handleSubscribe = (plan) => {
    setSelectedPlanForUpgrade(plan);
    setIsUpgradeDialogOpen(true);
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
                        onClick={() => handleSubscribe(plan)}
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

      {/* Upgrade Dialog */}
      <SubscriptionUpgradeDialog
        isOpen={isUpgradeDialogOpen}
        onClose={() => setIsUpgradeDialogOpen(false)}
        selectedPlan={selectedPlanForUpgrade}
        currentPlan={currentPlan}
      />
    </DashboardLayout>
  );
}

export { BuyerSubscription };

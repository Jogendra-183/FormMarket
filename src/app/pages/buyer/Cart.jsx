import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../components/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { 
  Minus, Plus, Trash2, ShoppingBag, ArrowRight, Check,
  User, Mail, Phone, MapPin, Building, Calendar, Lock,
  ChevronRight, ChevronLeft, CheckCircle, CreditCard,
  Wallet, Truck, Package, DollarSign
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { toast } from "sonner";

// Multi-Step Checkout Dialog
function CheckoutDialog({ isOpen, onClose, items, total }) {
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Review, 4: Success
  const [formData, setFormData] = useState({
    // Delivery Details
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryNotes: "",
    // Payment Details
    paymentMethod: "cod", // cod, card, upi, wallet
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { fullName, email, phone, address, city, state, zipCode } = formData;
    if (!fullName || !email || !phone || !address || !city || !state || !zipCode) {
      toast.error("Please fill in all required delivery fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { paymentMethod, cardNumber, cardName, expiryDate, cvv, upiId } = formData;
    
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error("Please fill in all card details");
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
    }
    
    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter your UPI ID");
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderId(newOrderId);
    setIsSubmitting(false);
    setStep(4);
    toast.success("Order placed successfully!");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setFormData({
        fullName: "", email: "", phone: "", address: "", city: "", state: "", zipCode: "",
        deliveryNotes: "", paymentMethod: "cod", cardNumber: "", cardName: "",
        expiryDate: "", cvv: "", upiId: ""
      });
      setOrderId("");
    }, 300);
  };

  const shippingCost = total >= 40 ? 0 : 5;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Complete Your Order</DialogTitle>
          <DialogDescription>
            Fill in the details below to complete your purchase
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[
            { num: 1, label: "Delivery" },
            { num: 2, label: "Payment" },
            { num: 3, label: "Review" },
            { num: 4, label: "Confirm" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                }`}>
                  {step > s.num ? <Check size={20} /> : s.num}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  step >= s.num ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
              {idx < 3 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  step > s.num ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Delivery Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-indigo-600" />
                Delivery Information
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
                  <Label htmlFor="address">Delivery Address *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Apartment 4B"
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

                <div className="col-span-2">
                  <Label htmlFor="deliveryNotes">Delivery Instructions (Optional)</Label>
                  <Input
                    id="deliveryNotes"
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="Leave at front door, Ring doorbell twice"
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

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Wallet className="h-5 w-5 text-indigo-600" />
                Payment Method
              </h3>

              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                {/* Cash on Delivery */}
                <div className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-bold">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </Label>
                </div>

                {/* Credit/Debit Card */}
                <div className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-bold">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Secure payment via card</p>
                    </div>
                  </Label>
                </div>

                {/* UPI */}
                <div className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-bold">UPI Payment</p>
                      <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                    </div>
                  </Label>
                </div>

                {/* Digital Wallet */}
                <div className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-bold">Digital Wallet</p>
                      <p className="text-sm text-muted-foreground">PayPal, Apple Pay, Google Pay</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Card Details (if card selected) */}
              {formData.paymentMethod === "card" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4"
                >
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
                </motion.div>
              )}

              {/* UPI ID (if UPI selected) */}
              {formData.paymentMethod === "upi" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4"
                >
                  <Label htmlFor="upiId">UPI ID *</Label>
                  <Input
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="yourname@upi"
                    className="mt-1"
                  />
                </motion.div>
              )}

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button onClick={handleNextStep} className="gap-2">
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review Order */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Package className="h-5 w-5 text-indigo-600" />
                Review Your Order
              </h3>

              {/* Order Items */}
              <div className="border rounded-xl p-4 space-y-3 max-h-[200px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Delivery Details */}
              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery Address
                </h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p className="font-bold text-foreground">{formData.fullName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.email}</p>
                  {formData.deliveryNotes && (
                    <p className="mt-2 italic">Note: {formData.deliveryNotes}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Payment Method
                </h4>
                <p className="text-sm">
                  {formData.paymentMethod === "cod" && "Cash on Delivery"}
                  {formData.paymentMethod === "card" && `Card ending in ****${formData.cardNumber.slice(-4)}`}
                  {formData.paymentMethod === "upi" && `UPI - ${formData.upiId}`}
                  {formData.paymentMethod === "wallet" && "Digital Wallet"}
                </p>
              </div>

              {/* Price Summary */}
              <div className="border rounded-xl p-4 bg-indigo-50 dark:bg-indigo-950/30">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-bold">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-black">Total</span>
                    <span className="font-black text-indigo-600 dark:text-indigo-400">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button 
                  onClick={handlePlaceOrder} 
                  disabled={isSubmitting}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
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
                <h3 className="text-2xl font-black mb-2">Order Placed Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                  <p className="text-3xl font-black text-emerald-600">{orderId}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Estimated delivery: 3-5 business days
                  </p>
                </div>

                <div className="text-left border rounded-xl p-4 mb-6">
                  <h4 className="font-bold mb-3">What's Next?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>You'll receive an order confirmation email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Track your order status in the Orders section</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Your items will be freshly packed and delivered</span>
                    </li>
                    {formData.paymentMethod === "cod" && (
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Prepare ${finalTotal.toFixed(2)} in cash for delivery</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Continue Shopping
                </Button>
                <Button onClick={handleClose} className="bg-indigo-600 hover:bg-indigo-700">
                  View Orders
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// Main Cart Component
function BuyerCart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const freeShippingThreshold = 40;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const freeShippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding some fresh products!
              </p>
              <Button onClick={() => navigate("/buyer/browse")} className="gap-2">
                Browse Products
                <ArrowRight size={16} />
              </Button>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    );
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
          <h1 className="text-4xl font-black mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground text-lg">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 object-cover rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="flex-1">
                        <h3 className="font-black text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {item.farmerName}
                        </p>
                        <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-2">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 border rounded-xl">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-black">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-bold">
                      {total >= freeShippingThreshold ? "FREE" : "$5.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-bold">${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                <div className="rounded-xl border p-3 bg-indigo-50 dark:bg-indigo-950/30">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Free delivery</span>
                    <span className="font-bold">${freeShippingThreshold}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <motion.div 
                      className="h-2 rounded-full bg-indigo-600"
                      initial={{ width: "0%" }}
                      animate={{ width: `${freeShippingProgress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {remainingForFreeShipping === 0
                      ? "🎉 You unlocked free delivery!"
                      : `Add $${remainingForFreeShipping.toFixed(2)} to unlock free delivery.`}
                  </p>
                </div>

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-black">Total</span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400">
                    ${(total + (total >= freeShippingThreshold ? 0 : 5) + total * 0.08).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Input 
                    placeholder="Enter promo code" 
                    className="rounded-xl"
                  />
                  <Button variant="outline" className="w-full rounded-xl">
                    Apply Code
                  </Button>
                </div>

                <Button
                  className="w-full rounded-xl"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  🔒 Secure checkout with SSL encryption
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutComplete}
        items={items}
        total={total}
      />
    </DashboardLayout>
  );
}
export {
  BuyerCart
};

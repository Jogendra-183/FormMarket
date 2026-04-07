import { Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useTheme } from "../contexts/ThemeContext";
import { CinematicIntro } from "../components/CinematicIntro";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { MarketingFooter } from "../components/MarketingFooter";
import {
  ArrowRight,
  Award,
  BarChart3,
  Check,
  Leaf,
  MapPin,
  MessageSquare,
  ShoppingCart,
  Sparkles,
  Sprout,
  Star,
  TrendingUp,
  Truck,
  Play,
  ChevronRight,
  Users,
  Package,
  Zap,
  Upload,
  ClipboardList,
  Search,
  Heart,
  Clock,
  CheckCircle2,
  Circle,
  PackageCheck,
  Quote,
  ArrowUpRight,
  Wheat,
  Target,
  Shield,
  Timer
} from "lucide-react";
import { products } from "../utils/mockData";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// ============================================
// HERO SECTION
// ============================================
function HeroSection({ theme }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-farm-fields-with-trees-28424-large.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-black/70 via-black/50 to-emerald-950/80' 
            : 'bg-gradient-to-b from-black/40 via-emerald-900/30 to-emerald-800/50'
        }`} />
        {/* Particle Glow Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full blur-sm"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{ 
                y: [null, -100],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">Fresh from the Farm</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Connecting Farmers
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 bg-clip-text text-transparent">
              Directly to Buyers
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Sell faster, buy smarter, deliver efficiently
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="/register?role=farmer">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sprout className="w-5 h-5" />
                Start Selling
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/buyer/browse">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Explore Market
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity }
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FEATURE CARDS SECTION
// ============================================
function FeatureCards({ theme }) {
  const navigate = useNavigate();
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0, id: null });

  const features = [
    {
      title: "List your harvest",
      description: "Upload products, set quantities, and publish in minutes.",
      icon: Upload,
      route: "/farmer/products",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      title: "Meet local demand",
      description: "Buyers discover seasonal produce with smart recommendations.",
      icon: Target,
      route: "/buyer/browse",
      gradient: "from-green-500 to-lime-600"
    },
    {
      title: "Deliver with confidence",
      description: "Coordinated pickup and delivery with real-time updates.",
      icon: Truck,
      route: "/farmer/orders",
      gradient: "from-lime-500 to-emerald-600"
    }
  ];

  const handleClick = (e, route, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      active: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id
    });
    setTimeout(() => {
      navigate(route);
    }, 300);
  };

  return (
    <section className={`py-24 relative ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-emerald-50/50'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Why Choose <span className="text-emerald-500">FarmMarket</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Everything you need to grow your agricultural business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -8 }}
              onClick={(e) => handleClick(e, feature.route, index)}
              className={`relative group cursor-pointer overflow-hidden rounded-3xl p-8 border backdrop-blur-xl transition-all duration-500 ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20' 
                  : 'bg-white/80 border-slate-200 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20'
              }`}
            >
              {/* Ripple Effect */}
              {ripple.active && ripple.id === index && (
                <motion.span
                  className="absolute bg-emerald-400/30 rounded-full pointer-events-none"
                  style={{ left: ripple.x, top: ripple.y }}
                  initial={{ width: 0, height: 0, x: 0, y: 0 }}
                  animate={{ 
                    width: 500, 
                    height: 500, 
                    x: -250, 
                    y: -250,
                    opacity: [0.5, 0]
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-3xl`} style={{ transform: 'scale(0.8)' }} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-emerald-500 font-semibold group-hover:gap-4 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LIVE MARKETPLACE PREVIEW
// ============================================
function ProductPreview({ theme }) {
  const [isLoading, setIsLoading] = useState(true);
  const displayProducts = products.slice(0, 6);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const SkeletonCard = () => (
    <div className={`rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/80'}`}>
      <div className={`aspect-square ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} animate-pulse`} />
      <div className="p-5 space-y-3">
        <div className={`h-5 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} animate-pulse w-3/4`} />
        <div className={`h-4 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} animate-pulse w-1/2`} />
        <div className="flex justify-between items-center pt-2">
          <div className={`h-6 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} animate-pulse w-20`} />
          <div className={`h-10 rounded-xl ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} animate-pulse w-24`} />
        </div>
      </div>
    </div>
  );

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 mb-4">
            <Zap className="w-3 h-3 mr-1" /> Live Marketplace
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Fresh From the <span className="text-emerald-500">Farm</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Discover seasonal products from local farmers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {isLoading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group rounded-3xl overflow-hidden border backdrop-blur-xl transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10' 
                    : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-xl'
                }`}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.rating >= 4.8 && (
                    <Badge className="absolute top-3 right-3 bg-emerald-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Top Rated
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {product.name}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {product.farmerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        ₹{(product.price * 83).toFixed(0)}
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                        /{product.unit}
                      </span>
                    </div>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/buyer/browse">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-8 py-6 text-lg font-bold">
              Browse All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// HOW IT WORKS SECTION
// ============================================
function HowItWorks({ theme }) {
  const steps = [
    {
      step: 1,
      title: "Upload Products",
      description: "List your fresh produce with photos, prices, and quantities",
      icon: Upload,
      color: "emerald"
    },
    {
      step: 2,
      title: "Buyers Place Orders",
      description: "Customers discover and order your products online",
      icon: ClipboardList,
      color: "green"
    },
    {
      step: 3,
      title: "Delivery Happens",
      description: "Coordinated pickup and delivery to the buyer's location",
      icon: Truck,
      color: "lime"
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-emerald-50/30'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-[radial-gradient(circle_at_1px_1px,_rgba(16,185,129,0.15)_1px,_transparent_0)]' 
            : 'bg-[radial-gradient(circle_at_1px_1px,_rgba(16,185,129,0.1)_1px,_transparent_0)]'
        }`} style={{ backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            How It <span className="text-emerald-500">Works</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Simple 3-step process to get started
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`relative p-8 rounded-3xl border backdrop-blur-xl text-center w-full max-w-xs ${
                  theme === 'dark' 
                    ? 'bg-slate-800/70 border-slate-700/50' 
                    : 'bg-white/90 border-slate-200'
                }`}
              >
                {/* Step Number */}
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                >
                  {step.step}
                </motion.div>

                <div className={`inline-flex p-5 rounded-2xl mb-6 ${
                  theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <step.icon className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block mx-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  <ChevronRight className={`w-8 h-8 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// INTERACTIVE INSIGHTS / STATS SECTION
// ============================================
function StatsSection({ theme }) {
  const [animatedStats, setAnimatedStats] = useState({ farmers: 0, orders: 0, deliveries: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Active Farmers", value: 2400, suffix: "+", icon: Users },
    { label: "Orders Completed", value: 18500, suffix: "+", icon: Package },
    { label: "Successful Deliveries", value: 15000, suffix: "+", icon: Truck }
  ];

  const chartData = [
    { name: 'Jan', orders: 400 },
    { name: 'Feb', orders: 300 },
    { name: 'Mar', orders: 600 },
    { name: 'Apr', orders: 800 },
    { name: 'May', orders: 1500 },
    { name: 'Jun', orders: 2000 },
    { name: 'Jul', orders: 2400 }
  ];

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setAnimatedStats({
          farmers: Math.floor(2400 * progress),
          orders: Math.floor(18500 * progress),
          deliveries: Math.floor(15000 * progress)
        });
        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} className={`py-24 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 mb-4">
            <BarChart3 className="w-3 h-3 mr-1" /> Live Insights
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Growing <span className="text-emerald-500">Together</span>
          </h2>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-3xl border text-center ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${
                theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
              }`}>
                <stat.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <div className={`text-4xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {index === 0 && animatedStats.farmers.toLocaleString()}
                {index === 1 && animatedStats.orders.toLocaleString()}
                {index === 2 && animatedStats.deliveries.toLocaleString()}
                {stat.suffix}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 rounded-3xl border max-w-4xl mx-auto ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700/50' 
              : 'bg-white border-slate-200'
          }`}
        >
          <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Orders Growth (2024)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function Testimonials({ theme }) {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Organic Farmer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      feedback: "FarmMarket has transformed my business. I now reach customers directly and earn 40% more than before. The platform is incredibly easy to use!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      feedback: "Getting fresh vegetables directly from farmers has improved our food quality significantly. Our customers love the freshness!",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Dairy Farmer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      feedback: "The delivery tracking feature gives my buyers confidence. I've built long-term relationships with many local businesses through this platform.",
      rating: 5
    },
    {
      name: "Sunita Devi",
      role: "Home Buyer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      feedback: "I love knowing exactly where my food comes from. The prices are fair and the produce is always fresh. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-emerald-50/30'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 mb-4">
            <Heart className="w-3 h-3 mr-1" /> Testimonials
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            What People <span className="text-emerald-500">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl border ${
                theme === 'dark' 
                  ? 'bg-slate-800/70 border-slate-700/50' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <Quote className={`w-8 h-8 mb-4 ${theme === 'dark' ? 'text-emerald-500/30' : 'text-emerald-200'}`} />
              <p className={`text-sm mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                "{testimonial.feedback}"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {testimonial.name}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SEARCH BAR SECTION
// ============================================
function SearchBar({ theme }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions] = useState([
    'Organic Tomatoes',
    'Fresh Strawberries',
    'Farm Eggs',
    'Local Honey',
    'Green Vegetables',
    'Seasonal Fruits'
  ]);

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={`relative rounded-2xl transition-all duration-300 ${
            isFocused 
              ? 'ring-4 ring-emerald-500/20' 
              : ''
          }`}>
            <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-slate-800/70 border-slate-700/50' 
                : 'bg-white border-slate-200 shadow-lg'
            }`}>
              <Search className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search crops, location, price..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className={`flex-1 bg-transparent outline-none text-lg ${
                  theme === 'dark' ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
                }`}
              />
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                Search
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {isFocused && query && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'bg-white border-slate-200 shadow-xl'
                  }`}
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className={`w-full px-6 py-3 text-left flex items-center gap-3 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-slate-700/50 text-white' 
                          : 'hover:bg-emerald-50 text-slate-900'
                      }`}
                    >
                      <Search className="w-4 h-4 text-slate-400" />
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// LOCATION-BASED SUGGESTIONS
// ============================================
function LocationSection({ theme }) {
  const nearbyProducts = [
    { name: "Fresh Mangoes", price: 150, location: "Ratnagiri", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400", distance: "15 km" },
    { name: "Organic Rice", price: 80, location: "Basmati Valley", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", distance: "22 km" },
    { name: "Local Vegetables", price: 45, location: "Green Farms", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400", distance: "8 km" },
    { name: "Fresh Milk", price: 60, location: "Dairy Farm", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400", distance: "5 km" }
  ];

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-emerald-50/30'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Based on your location
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Popular <span className="text-emerald-500">Near You</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {nearbyProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl overflow-hidden border ${
                theme === 'dark' 
                  ? 'bg-slate-800/70 border-slate-700/50' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-black/50 text-white border-0 text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {product.distance}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {product.name}
                </h3>
                <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {product.location}
                </p>
                <span className="text-emerald-500 font-bold">₹{product.price}/kg</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// ORDER TRACKING PREVIEW
// ============================================
function OrderTrackingPreview({ theme }) {
  const orders = [
    {
      id: "ORD-2024-001",
      product: "Organic Vegetables Bundle",
      status: "In Transit",
      progress: 66,
      steps: [
        { label: "Order Placed", completed: true },
        { label: "Packed", completed: true },
        { label: "In Transit", completed: true, current: true },
        { label: "Delivered", completed: false }
      ]
    },
    {
      id: "ORD-2024-002",
      product: "Fresh Farm Eggs (2 Dozen)",
      status: "Delivered",
      progress: 100,
      steps: [
        { label: "Order Placed", completed: true },
        { label: "Packed", completed: true },
        { label: "In Transit", completed: true },
        { label: "Delivered", completed: true }
      ]
    }
  ];

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 mb-4">
            <Timer className="w-3 h-3 mr-1" /> Real-time Tracking
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Track Your <span className="text-emerald-500">Orders</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`p-6 rounded-3xl border ${
                theme === 'dark' 
                  ? 'bg-slate-800/70 border-slate-700/50' 
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {order.id}
                  </p>
                  <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {order.product}
                  </h3>
                </div>
                <Badge className={`${
                  order.status === 'Delivered' 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                }`}>
                  {order.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Truck className="w-3 h-3 mr-1" />}
                  {order.status}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <motion.div 
                    className="h-full bg-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${order.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="flex justify-between">
                {order.steps.map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      step.completed 
                        ? 'bg-emerald-500 text-white' 
                        : theme === 'dark' ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-400'
                    } ${step.current ? 'ring-4 ring-emerald-500/30' : ''}`}>
                      {step.completed ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs text-center ${
                      step.completed 
                        ? theme === 'dark' ? 'text-white' : 'text-slate-900' 
                        : theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FINAL CTA SECTION
// ============================================
function CTASection({ theme }) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-96 h-96 bg-white/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-full mb-8"
          >
            <Wheat className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Start Your Journey
            <br />
            <span className="text-emerald-200">Today</span>
          </h2>

          <p className="text-xl text-white/80 mb-10">
            Join thousands of farmers and buyers transforming agricultural trade in India
          </p>

          <Link to="/register">
            <motion.button
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-600 font-bold text-lg rounded-2xl shadow-2xl shadow-black/20 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// MAIN HOMEPAGE COMPONENT
// ============================================
function HomePage() {
  const { theme } = useTheme();
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {/* Cinematic Intro */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} theme={theme} />
      )}

      <motion.div
        className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Navigation */}
        <MarketingNavbar />

        {/* Main Sections */}
        <HeroSection theme={theme} />
        <FeatureCards theme={theme} />
        <ProductPreview theme={theme} />
        <HowItWorks theme={theme} />
        <StatsSection theme={theme} />
        <Testimonials theme={theme} />
        <SearchBar theme={theme} />
        <LocationSection theme={theme} />
        <OrderTrackingPreview theme={theme} />
        <CTASection theme={theme} />
        <MarketingFooter />
      </motion.div>
    </>
  );
}

export { HomePage };

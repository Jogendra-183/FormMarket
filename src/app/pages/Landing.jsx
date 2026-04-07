import { Link } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AutoCarousel } from "../components/ui/auto-carousel";
import { useTheme } from "../contexts/ThemeContext";
import { 
  CinematicReelBackground,
  ThemeToggle,
  MagneticButton,
  ThreeDCard,
  CinematicOverlay
} from "../components/CinematicComponents";
import { CinematicIntro } from "../components/CinematicIntro";
import { 
  AnimatedPage, 
  StaggerContainer, 
  StaggerItem, 
  ScrollReveal,
  FadeIn,
  SlideIn,
  HoverLift 
} from "../components/AnimationWrappers";
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
  Film,
  Play,
  ChevronRight,
  Users,
  Package,
  Zap
} from "lucide-react";
import { forumPosts, products, subscriptionPlans, successStories } from "../utils/mockData";

function Landing() {
  const { theme, toggleTheme } = useTheme();
  const [isCinematic, setIsCinematic] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  const heroStats = [
    { label: "Farmers onboarded", value: "2.4k", icon: Users },
    { label: "Weekly deliveries", value: "18k", icon: Package },
    { label: "Avg rating", value: "4.9", icon: Star }
  ];

  const steps = [
    {
      title: "List your harvest",
      description: "Upload products, set quantities, and publish in minutes.",
      icon: Leaf
    },
    {
      title: "Meet local demand",
      description: "Buyers discover seasonal produce with smart recommendations.",
      icon: MapPin
    },
    {
      title: "Deliver with confidence",
      description: "Coordinated pickup and delivery with real-time updates.",
      icon: Truck
    }
  ];

  return (
    <>
      {/* Cinematic Intro Video */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} theme={theme} />
      )}

      <motion.div 
        className={`min-h-screen font-sans transition-all duration-1000 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        } ${isCinematic ? 'overflow-hidden' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
      <CinematicReelBackground theme={theme} isCinematic={isCinematic} />
      <CinematicOverlay isActive={isCinematic} onClose={() => setIsCinematic(false)} />
      
      {/* Hero Section */}
      <header className={`relative transition-all duration-1000 ${
        isCinematic ? 'opacity-0 scale-95 blur-xl' : 'opacity-100'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between mb-20">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={`p-3 rounded-2xl ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Sprout className="h-7 w-7" />
              </motion.div>
              <div>
                <p className="text-xl font-black">FarmMarket</p>
                <p className="text-xs opacity-60 tracking-wider uppercase">Harvest to Home</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} inline={true} />
              <Link to="/login">
                <Button variant="ghost" size="lg" className="rounded-2xl">
                  Login
                </Button>
              </Link>
            </motion.div>
          </nav>

          <div className="max-w-5xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border backdrop-blur-xl text-xs font-black uppercase tracking-widest mb-10 shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-indigo-400' 
                  : 'bg-white/50 border-black/5 text-indigo-600'
              }`}>
                <Play size={14} className="fill-current" />
                2026 Harvest Season
              </div>
            </motion.div>
            
            <motion.h1 
              className={`text-6xl md:text-8xl lg:text-9xl font-black mb-10 bg-clip-text text-transparent leading-none tracking-tighter transition-all duration-700 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-b from-white to-white/20' 
                  : 'bg-gradient-to-b from-slate-900 to-slate-400'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Farm to Table.<br />Direct.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 opacity-70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Build direct relationships, unlock demand signals, and deliver the freshest produce
              with a platform designed for modern agriculture.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/register?role=farmer">
                <MagneticButton theme={theme} variant="primary">
                  <Sprout size={20} />
                  <span>I am a Farmer</span>
                </MagneticButton>
              </Link>
              <Link to="/register?role=buyer">
                <MagneticButton theme={theme} variant="secondary">
                  <ShoppingCart size={20} />
                  <span>I am a Buyer</span>
                </MagneticButton>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-8 md:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {heroStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="text-indigo-500" size={24} />
                    <span className="text-4xl font-black">{stat.value}</span>
                  </div>
                  <span className="text-sm opacity-60 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={`transition-all duration-1000 ${
        isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent ${
              theme === 'dark' 
                ? 'bg-gradient-to-b from-white to-white/40' 
                : 'bg-gradient-to-b from-slate-900 to-slate-500'
            }`}>
              How It Works
            </h2>
            <p className="text-xl opacity-60 max-w-2xl mx-auto">
              Three simple steps to transform your farming business
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-6xl mx-auto mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <ThreeDCard 
                  theme={theme}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className={`transition-all duration-1000 ${
        isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent ${
              theme === 'dark' 
                ? 'bg-gradient-to-b from-white to-white/40' 
                : 'bg-gradient-to-b from-slate-900 to-slate-500'
            }`}>
              Fresh Produce
            </h2>
            <p className="text-xl opacity-60">
              Discover seasonal products from local farmers
            </p>
          </motion.div>

          <AutoCarousel className="mb-12">
            {products.slice(0, 6).map((product) => (
              <Card 
                key={product.id} 
                className={`overflow-hidden backdrop-blur-2xl border transition-all hover:scale-105 ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/60 border-black/5'
                }`}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.certified && (
                    <Badge className="absolute top-3 right-3 bg-indigo-600 text-white">
                      <Check className="h-3 w-3" /> Certified
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <span className="text-sm opacity-60">per {product.unit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AutoCarousel>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Link to="/register">
              <MagneticButton theme={theme} variant="secondary">
                <span>Browse All Products</span>
                <ChevronRight size={20} />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 border-t backdrop-blur-3xl transition-all ${
        theme === 'dark' ? 'border-white/5 bg-black/40' : 'border-black/5 bg-white/40'
      } ${isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-black tracking-[0.4em] opacity-40 uppercase mb-6">
              Aesthetic Excellence • Next Gen Agriculture
            </p>
            <div className="flex justify-center gap-8 opacity-20 mb-6">
              <Zap size={24} />
              <Sparkles size={24} />
              <TrendingUp size={24} />
            </div>
            <p className="text-sm opacity-60">
              © 2026 FarmMarket. Building the future of farm-to-table commerce.
            </p>
          </div>
        </div>
      </footer>
      </motion.div>
    </>
  );
}

export { Landing };

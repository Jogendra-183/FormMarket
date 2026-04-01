import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AutoCarousel } from "../components/ui/auto-carousel";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
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
  Truck
} from "lucide-react";
import { forumPosts, products, subscriptionPlans, successStories } from "../utils/mockData";

function Landing() {
  const heroStats = [
    { label: "Farmers onboarded", value: "2.4k" },
    { label: "Weekly deliveries", value: "18k" },
    { label: "Avg rating", value: "4.9" }
  ];

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      alt: "Fresh organic vegetables at farmers market"
    },
    {
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
      alt: "Farmer harvesting fresh produce"
    },
    {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      alt: "Colorful fruit display at market"
    },
    {
      src: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&q=80",
      alt: "Local farmers market with fresh products"
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
      alt: "Farm to table fresh vegetables"
    }
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
    <AnimatedPage className="min-h-screen fm-page text-foreground">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 fm-grid opacity-40" />
        <FadeIn>
          <nav className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between">
            <SlideIn direction="left">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="bg-primary p-2 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sprout className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                <div>
                  <p className="text-lg font-semibold">FarmMarket</p>
                  <p className="text-xs text-muted-foreground">Harvest to home</p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <Link to="/login">
                  <Button variant="ghost" className="hover-scale">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="hover-lift">Get Started</Button>
                </Link>
              </div>
            </SlideIn>
          </nav>
        </FadeIn>

        <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <Badge variant="outline" className="bg-white/80 hover-lift">
                <Sparkles className="h-3 w-3" />
                2026 harvest season is live
              </Badge>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-4xl md:text-6xl leading-tight">
                The marketplace that grows with your farm and your table.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
                Build direct relationships, unlock demand signals, and deliver the freshest produce
                with a platform designed for modern agriculture.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-wrap gap-3">
                <Link to="/register?role=farmer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg">
                      I am a Farmer
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/register?role=buyer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline">
                      I am a Buyer
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {heroStats.map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    className="fm-panel rounded-2xl px-4 py-3 hover-lift cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.p 
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>

          <SlideIn direction="right" delay={0.3}>
            <div className="relative">
              <AutoCarousel
                images={heroImages}
                interval={5000}
                className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                imageClassName="object-cover"
                showControls={true}
                showDots={true}
                fadeTransition={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl pointer-events-none" />
            </div>
          </SlideIn>
        </div>
      </header>

      <ScrollReveal>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <StaggerContainer className="flex items-center justify-between gap-4 flex-wrap mb-10">
              <StaggerItem>
                <div>
                  <h2 className="text-3xl md:text-4xl">Seasonal highlights</h2>
                  <p className="text-muted-foreground">
                    Curated produce from farms trending in your area.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <Link to="/buyer/browse">
                  <Button variant="outline" className="hover-lift">
                    Browse marketplace
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </StaggerItem>
            </StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product, index) => (
                <ScrollReveal key={product.id} threshold={0.2}>
                  <HoverLift>
                    <Card className="overflow-hidden h-full">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-40 w-full object-cover"
                        />
                      </motion.div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.farmerName}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-semibold">${product.price}</p>
                          <p className="text-xs text-muted-foreground">per {product.unit}</p>
                        </div>
                        <Badge variant="outline" className="bg-white/70">
                          {product.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-white/70">
                <BarChart3 className="h-3 w-3" />
                Smart operations
              </Badge>
              <h2 className="text-3xl md:text-4xl">Upgrade every step of your farm business</h2>
              <p className="text-muted-foreground">
                From pricing signals to buyer retention, FarmMarket keeps growers in control
                with clear data and an effortless buying experience.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={step.title} className="h-full" style={{ "--i": index }}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl">Success stories</h2>
            <p className="text-muted-foreground">Real farmers, real results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <img src={story.image} alt={story.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">{story.revenue}</Badge>
                  </div>
                  <CardDescription className="text-sm">{story.farm}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 italic">"{story.story}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#f5b84b] text-[#f5b84b]" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl">Plans that scale with you</h2>
            <p className="text-muted-foreground">Flexible options for every growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "border-primary border-2 shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-semibold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl">Community spotlight</h2>
            <p className="text-muted-foreground">Learn, share, and grow together</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground capitalize">{post.role}</p>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {post.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {post.likes}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/community">
              <Button size="lg" variant="outline">
                Explore Community
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-6 w-6" />
                <span className="font-bold text-lg">FarmMarket</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting farmers and consumers for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Farmers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sell Products</li>
                <li>Analytics</li>
                <li>Learning Hub</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Browse Products</li>
                <li>Subscriptions</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 FarmMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { Landing };

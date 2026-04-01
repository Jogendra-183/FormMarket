import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AutoCarousel } from "../components/ui/auto-carousel";
import { 
  AnimatedPage, 
  StaggerContainer, 
  StaggerItem, 
  SlideIn,
  FadeIn,
  ScaleIn 
} from "../components/AnimationWrappers";
import { Eye, EyeOff, Shield, Sparkles, Sprout } from "lucide-react";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginImages = [
    {
      src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80",
      alt: "Beautiful sunset over farmland"
    },
    {
      src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80",
      alt: "Fresh vegetables in a basket"
    },
    {
      src: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=1200&q=80",
      alt: "Farmer working in field"
    },
    {
      src: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=1200&q=80",
      alt: "Fresh produce at farmers market"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      toast.success("Login successful!");
      if (role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (role === "buyer") {
        navigate("/buyer/browse");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <AnimatedPage className="min-h-screen fm-page flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-stretch">
        <SlideIn direction="left" delay={0.2}>
          <div className="hidden lg:block relative rounded-3xl overflow-hidden shadow-2xl">
            <AutoCarousel
              images={loginImages}
              interval={4500}
              className="h-full min-h-[600px]"
              imageClassName="object-cover"
              showControls={false}
              showDots={true}
              fadeTransition={true}
              overlayContent={(image, index) => (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="text-white space-y-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                    >
                      <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                        <Sparkles className="h-3 w-3" />
                        Trusted by thousands
                      </Badge>
                    </motion.div>
                    <motion.h2 
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      {index === 0 && "Connect with local farmers"}
                      {index === 1 && "Fresh produce delivered daily"}
                      {index === 2 && "Support sustainable farming"}
                      {index === 3 && "Join our thriving community"}
                    </motion.h2>
                    <motion.p 
                      className="text-white/90 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      {index === 0 && "Build direct relationships with farmers in your area"}
                      {index === 1 && "Get farm-fresh products delivered to your doorstep"}
                      {index === 2 && "Make a positive impact on local agriculture"}
                      {index === 3 && "Thousands of farmers and buyers trust FarmMarket"}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            />
          </div>
        </SlideIn>

        <SlideIn direction="right" delay={0.1}>
          <Card className="w-full flex flex-col justify-center hover-lift">
            <StaggerContainer>
              <CardHeader className="text-center">
                <StaggerItem>
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      className="bg-primary p-3 rounded-full shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sprout className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <CardTitle className="text-2xl">Sign in</CardTitle>
                </StaggerItem>
                <StaggerItem>
                  <CardDescription>Access your FarmMarket workspace</CardDescription>
                </StaggerItem>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <StaggerItem>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus-glow transition-all duration-300"
                        required
                      />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <motion.button 
                          type="button" 
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Forgot password?
                        </motion.button>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-12 focus-glow transition-all duration-300"
                          required
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </motion.button>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="space-y-2">
                      <Label htmlFor="role">I am a...</Label>
                      <Select value={role} onValueChange={(value) => setRole(value)}>
                        <SelectTrigger className="focus-glow transition-all duration-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buyer">Buyer</SelectItem>
                          <SelectItem value="farmer">Farmer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">Don't have an account? </span>
                      <Link to="/register" className="text-primary hover:underline transition-colors">
                        Sign up
                      </Link>
                    </div>
                  </StaggerItem>
                </form>
              </CardContent>
            </StaggerContainer>
          </Card>
        </SlideIn>
      </div>
    </div>
  );
}

export { Login };

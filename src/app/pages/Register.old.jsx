import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
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
import { Eye, EyeOff, Sparkles, Sprout, Users, ShoppingBag, TrendingUp } from "lucide-react";
import { toast } from "sonner";

function Register() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(roleParam || "buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const signupImages = [
    {
      src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80",
      alt: "Farmer working with fresh produce",
      role: "farmer",
      title: "Grow Your Business",
      desc: "Reach thousands of local buyers"
    },
    {
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
      alt: "Fresh vegetables harvest",
      role: "farmer",
      title: "Manage Your Harvest",
      desc: "Track inventory and orders easily"
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
      alt: "Fresh produce at market",
      role: "buyer",
      title: "Shop Local & Fresh",
      desc: "Get farm-fresh produce delivered"
    },
    {
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
      alt: "Community marketplace",
      role: "buyer",
      title: "Support Local Farmers",
      desc: "Join a sustainable food community"
    }
  ];

  const getPasswordStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    const levels = [
      { label: "Weak", color: "bg-red-400", width: "25%" },
      { label: "Fair", color: "bg-amber-400", width: "50%" },
      { label: "Good", color: "bg-primary", width: "75%" },
      { label: "Strong", color: "bg-emerald-500", width: "100%" }
    ];

    return levels[Math.min(score, levels.length - 1)];
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await register(name, email, password, role);
      toast.success("Account created successfully!");
      if (role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (role === "buyer") {
        navigate("/buyer/browse");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <AnimatedPage className="min-h-screen fm-page flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-stretch">
        <SlideIn direction="left" delay={0.2} className="hidden lg:block relative rounded-3xl overflow-hidden shadow-2xl">
          <AutoCarousel
            images={signupImages}
            interval={5000}
            className="h-full min-h-[650px]"
            imageClassName="object-cover"
            showControls={false}
            showDots={true}
            fadeTransition={true}
            overlayContent={(image, index) => (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                <div className="text-white space-y-3">
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    <Sparkles className="h-3 w-3" />
                    {image.role === "farmer" ? "For Farmers" : "For Buyers"}
                  </Badge>
                  <h2 className="text-3xl font-semibold">
                    {image.title}
                  </h2>
                  <p className="text-white/90">
                    {image.desc}
                  </p>
                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">2.4k+ members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">4.9★ rating</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </SlideIn>

        <SlideIn direction="right" delay={0.4} className="w-full">
          <Card className="w-full flex flex-col justify-center">
          <CardHeader className="text-center">
            <ScaleIn delay={0.6}>
              <div className="flex justify-center mb-4">
                <div className="bg-primary p-3 rounded-full shadow-sm">
                  <Sprout className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </ScaleIn>
            <FadeIn delay={0.8}>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Join the FarmMarket community today</CardDescription>
            </FadeIn>
          </CardHeader>
          <CardContent>
            <StaggerContainer>
              <form onSubmit={handleSubmit} className="space-y-4">
              <StaggerItem>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-glow"
                    required
                  />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus-glow"
                    required
                  />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-12 focus-glow"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover-scale"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <motion.div className="rounded-full bg-black/5 h-2 overflow-hidden">
                    <motion.div 
                      className={`h-2 rounded-full ${strength.color}`} 
                      initial={{ width: "0%" }}
                      animate={{ width: strength.width }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.div>
                  <p className="text-xs text-muted-foreground">Password strength: {strength.label}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-12 focus-glow"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover-scale"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select value={role} onValueChange={(value) => setRole(value)}>
                    <SelectTrigger className="focus-glow">
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
                    Create Account
                  </Button>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </StaggerItem>
            </form>
            </StaggerContainer>
          </CardContent>
        </Card>
        </SlideIn>
      </div>
    </AnimatedPage>
  );
}

export { Register };

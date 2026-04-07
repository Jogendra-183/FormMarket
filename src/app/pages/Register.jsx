import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CinematicReelBackground, ThemeToggle, MagneticButton } from "../components/CinematicComponents";
import { ImageBasedCharacter } from "../components/ImageBasedCharacter";
import { Eye, EyeOff, Sparkles, Sprout, UserPlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
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
  const [inputFocus, setInputFocus] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error, clearError } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Handle typing detection
  useEffect(() => {
    if (email.length > 0 || password.length > 0 || confirmPassword.length > 0 || name.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [email, password, confirmPassword, name]);

  // Clear error when inputs change
  useEffect(() => {
    if (error) clearError();
  }, [email, password, confirmPassword, name, role]);

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

    return score > 0 ? levels[score - 1] : { label: "", color: "", width: "0%" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password, role);
      toast.success("Welcome to FarmMarket! 🎉", {
        description: "Your account has been created successfully"
      });
      if (role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (role === "buyer") {
        navigate("/buyer/browse");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden flex transition-all duration-1000 ${
      theme === 'dark' ? 'text-white' : 'text-slate-900'
    }`}>
      <CinematicReelBackground theme={theme} isCinematic={false} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      {/* Split Screen Layout */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Side - Animated Character */}
        <motion.div 
          className={`hidden md:flex md:w-1/2 flex-col items-center justify-center relative overflow-hidden ${
            theme === 'dark' ? 'bg-gradient-to-br from-indigo-950/50 to-purple-950/50' : 'bg-gradient-to-br from-indigo-50 to-purple-50'
          }`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting Message */}
          <motion.div
            className="absolute top-12 md:top-16 z-10 px-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={`px-6 md:px-8 py-3 md:py-4 rounded-3xl backdrop-blur-xl shadow-2xl ${
              theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-white/90 border border-black/10'
            }`}>
              <h2 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
                Let's get started! <span className="text-2xl md:text-3xl">🚀</span>
              </h2>
            </div>
          </motion.div>

          {/* Animated Character */}
          <div className="w-full h-full flex items-center justify-center flex-1">
            <ImageBasedCharacter
              inputFocus={inputFocus}
              nameValue={name}
              emailValue={email}
              passwordValue={password}
              confirmPasswordValue={confirmPassword}
              isTyping={isTyping}
              theme={theme}
            />
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <div className="flex-1 flex items-center justify-center p-2 md:p-4 lg:p-6 h-full overflow-y-auto">
          <motion.div
            className="w-full max-w-md my-auto pb-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link to="/" className="flex items-center gap-3 justify-center mb-6 md:mb-8">
          <motion.div 
            className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Sprout className="h-7 w-7" />
          </motion.div>
          <div>
            <p className="text-2xl font-black">FarmMarket</p>
            <p className="text-xs opacity-60 tracking-wider uppercase">Harvest to Home</p>
          </div>
        </Link>

        <Card className={`backdrop-blur-3xl rounded-[2.5rem] p-6 border relative overflow-hidden transition-all ${
          theme === 'dark' ? 'bg-black/80 border-white/5' : 'bg-white/80 border-black/5'
        }`}>
          <CardHeader className="space-y-2 pb-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-xl text-xs font-black uppercase tracking-wider shadow-xl ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-white/50 border-black/5 text-indigo-600'
            }`}>
              <Sparkles size={14} />
              <span>Join the Community</span>
            </div>
            <CardTitle className="text-4xl font-black">Create Account</CardTitle>
            <CardDescription className="text-lg">
              Start your journey with FarmMarket today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-base font-bold">I am a</Label>
                <Select 
                  value={role} 
                  onValueChange={setRole}
                  onOpenChange={(open) => setInputFocus(open ? 'role' : null)}
                >
                  <SelectTrigger id="role" className="h-12 rounded-xl text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-bold">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setInputFocus('name')}
                  onBlur={() => setInputFocus(null)}
                  required
                  className="h-12 rounded-xl text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-bold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setInputFocus('email')}
                  onBlur={() => setInputFocus(null)}
                  required
                  className="h-12 rounded-xl text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-bold">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setInputFocus('password')}
                    onBlur={() => setInputFocus(null)}
                    required
                    className="h-12 rounded-xl text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {password && (
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <p className="text-xs opacity-60">Password strength: {strength.label}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-bold">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setInputFocus('confirmPassword')}
                    onBlur={() => setInputFocus(null)}
                    required
                    className="h-12 rounded-xl text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPassword && (
                  <p className={`text-xs ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                    {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              <MagneticButton 
                theme={theme} 
                variant="primary" 
                className="w-full"
                onClick={handleSubmit}
                type="submit"
              >
                <UserPlus size={20} />
                <span>Create Account</span>
              </MagneticButton>
            </form>

            <div className="mt-4 text-center space-y-2">
              <p className="text-sm opacity-60">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
                  Sign in →
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.p 
          className="text-center mt-4 text-[10px] opacity-40 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
        >
          Secure • Encrypted • Private
        </motion.p>
      </motion.div>
      </div>    
      </div>
    </div>
  );
}

export { Register };

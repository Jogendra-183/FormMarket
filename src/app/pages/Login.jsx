import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CinematicReelBackground, ThemeToggle, MagneticButton } from "../components/CinematicComponents";
import { Eye, EyeOff, Shield, Sparkles, Sprout, ArrowRight, LogIn } from "lucide-react";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
      theme === 'dark' ? 'text-white' : 'text-slate-900'
    }`}>
      <CinematicReelBackground theme={theme} isCinematic={false} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Link to="/" className="flex items-center gap-3 justify-center mb-8">
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

        <Card className={`backdrop-blur-3xl rounded-[2.5rem] p-8 border relative overflow-hidden transition-all ${
          theme === 'dark' ? 'bg-black/80 border-white/5' : 'bg-white/80 border-black/5'
        }`}>
          <CardHeader className="space-y-4 pb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-xl text-xs font-black uppercase tracking-wider shadow-xl ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-white/50 border-black/5 text-indigo-600'
            }`}>
              <Shield size={14} />
              <span>Secure Login</span>
            </div>
            <CardTitle className="text-4xl font-black">Welcome Back</CardTitle>
            <CardDescription className="text-lg">
              Sign in to continue to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-base font-bold">I am a</Label>
                <Select value={role} onValueChange={setRole}>
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
                <Label htmlFor="email" className="text-base font-bold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <MagneticButton 
                theme={theme} 
                variant="primary" 
                className="w-full"
                onClick={handleSubmit}
                type="submit"
              >
                <LogIn size={20} />
                <span>Sign In</span>
              </MagneticButton>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-sm opacity-60">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
                  Create one →
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.p 
          className="text-center mt-6 text-xs opacity-40 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
        >
          Secure • Encrypted • Private
        </motion.p>
      </motion.div>
    </div>
  );
}

export { Login };

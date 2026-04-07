import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CinematicReelBackground, ThemeToggle, MagneticButton } from "../components/CinematicComponents";
import { ImageBasedCharacter } from "../components/ImageBasedCharacter";
import { Eye, EyeOff, Shield, Sparkles, Sprout, ArrowRight, LogIn, Loader2, AlertCircle, KeyRound } from "lucide-react";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const { login, error, clearError } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Handle typing detection
  useEffect(() => {
    if (email.length > 0 || password.length > 0 || otp.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [email, password, otp]);

  // Clear error when inputs change
  useEffect(() => {
    if (error && clearError) clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, role, otp]);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Email required", {
        description: "Please enter your email to receive OTP"
      });
      return;
    }

    setIsSendingOTP(true);
    try {
      // Simulate OTP sending - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      toast.success("OTP Sent! 📧", {
        description: "Check your email for the verification code"
      });
    } catch (error) {
      toast.error("Failed to send OTP", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      if (useOTP) {
        // Handle OTP login - replace with actual API call
        if (!otp || otp.length !== 6) {
          throw new Error("Please enter a valid 6-digit OTP");
        }
        // Simulate OTP verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Welcome back! 🎉", {
          description: "OTP verified successfully"
        });
      } else {
        await login(email, password, role);
        toast.success("Welcome back! 🎉", {
          description: "Login successful"
        });
      }
      
      if (role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (role === "buyer") {
        navigate("/buyer/browse");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Login failed", {
        description: error.message || "Please check your credentials"
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
          {/* Floating Decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-200/40'}`}
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
          
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
                Hey! Ready to log in? <span className="text-2xl md:text-3xl">👋</span>
              </h2>
            </div>
          </motion.div>

          {/* Animated Character */}
          <div className="w-full h-full flex items-center justify-center flex-1">
            <ImageBasedCharacter
              inputFocus={inputFocus}
              emailValue={email}
              passwordValue={password}
              isTyping={isTyping}
              theme={theme}
            />
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8 h-full overflow-y-auto">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link to="/" className="flex items-center gap-3 justify-center mb-6 md:mb-8">
              <motion.div 
                className={`p-2 md:p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sprout className="h-6 w-6 md:h-7 md:w-7" />
              </motion.div>
              <div>
                <p className="text-xl md:text-2xl font-black">FarmMarket</p>
                <p className="text-xs opacity-60 tracking-wider uppercase">Harvest to Home</p>
              </div>
            </Link>

            <Card className={`backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border relative overflow-hidden transition-all ${
              theme === 'dark' ? 'bg-black/80 border-white/5' : 'bg-white/80 border-black/5'
            }`}>
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] opacity-50 pointer-events-none">
                <div className={`absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r ${
                  theme === 'dark' 
                    ? 'from-indigo-500/20 via-purple-500/20 to-pink-500/20' 
                    : 'from-indigo-200/50 via-purple-200/50 to-pink-200/50'
                } animate-gradient blur-xl`} />
              </div>
              
              <CardHeader className="space-y-3 md:space-y-4 pb-6 md:pb-8 relative z-10">
                <motion.div 
                  className={`inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border backdrop-blur-xl text-xs font-black uppercase tracking-wider shadow-xl ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-indigo-400' : 'bg-white/50 border-black/5 text-indigo-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield size={14} />
                  <span>Secure Login</span>
                </motion.div>
                <CardTitle className="text-3xl md:text-4xl font-black">Welcome Back</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Sign in to continue to your account
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-500 text-sm"
                    >
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm md:text-base font-bold">I am a</Label>
                    <Select 
                      value={role} 
                      onValueChange={setRole}
                      onOpenChange={(open) => setInputFocus(open ? 'role' : null)}
                    >
                      <SelectTrigger id="role" className="h-11 md:h-12 rounded-xl text-sm md:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buyer">🛒 Buyer</SelectItem>
                        <SelectItem value="farmer">🌾 Farmer</SelectItem>
                        <SelectItem value="admin">🛡️ Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base font-bold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setInputFocus('email')}
                      onBlur={() => setInputFocus(null)}
                      required
                      disabled={isSubmitting}
                      className="h-11 md:h-12 rounded-xl text-sm md:text-base transition-all focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm md:text-base font-bold">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setInputFocus('password')}
                        onBlur={() => setInputFocus(null)}
                        required={!useOTP}
                        disabled={isSubmitting || useOTP}
                        className="h-11 md:h-12 rounded-xl text-sm md:text-base pr-12 transition-all focus:ring-2 focus:ring-indigo-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                        disabled={isSubmitting || useOTP}
                      >
                        {showPassword ? <EyeOff size={18} className="md:w-5 md:h-5" /> : <Eye size={18} className="md:w-5 md:h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* OTP Toggle Section */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className={`w-full border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`} />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <button
                        type="button"
                        onClick={() => {
                          setUseOTP(!useOTP);
                          setOtpSent(false);
                          setOtp("");
                        }}
                        disabled={isSubmitting}
                        className={`px-4 py-1.5 rounded-full font-bold transition-all ${
                          theme === 'dark' 
                            ? 'bg-black/80 hover:bg-black text-indigo-400 hover:text-indigo-300' 
                            : 'bg-white hover:bg-gray-50 text-indigo-600 hover:text-indigo-500'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <KeyRound size={14} />
                          {useOTP ? 'Use Password' : 'Use OTP Instead'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* OTP Input Section */}
                  <AnimatePresence>
                    {useOTP && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1.25rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="otp" className="text-sm md:text-base font-bold">One-Time Password</Label>
                          <div className="flex gap-2">
                            <Input
                              id="otp"
                              type="text"
                              placeholder="Enter 6-digit OTP"
                              value={otp}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setOtp(value);
                              }}
                              onFocus={() => setInputFocus('otp')}
                              onBlur={() => setInputFocus(null)}
                              required={useOTP}
                              disabled={isSubmitting || !otpSent}
                              maxLength={6}
                              className="h-11 md:h-12 rounded-xl text-sm md:text-base transition-all focus:ring-2 focus:ring-indigo-500/50 flex-1"
                            />
                            <Button
                              type="button"
                              onClick={handleSendOTP}
                              disabled={isSendingOTP || !email || otpSent}
                              className={`h-11 md:h-12 px-4 md:px-6 rounded-xl text-sm font-bold ${
                                otpSent 
                                  ? 'bg-green-600 hover:bg-green-600' 
                                  : theme === 'dark'
                                  ? 'bg-indigo-600 hover:bg-indigo-500'
                                  : 'bg-indigo-600 hover:bg-indigo-500'
                              } text-white`}
                            >
                              {isSendingOTP ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : otpSent ? (
                                '✓ Sent'
                              ) : (
                                'Send OTP'
                              )}
                            </Button>
                          </div>
                          {otpSent && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-green-500 flex items-center gap-1"
                            >
                              <Sparkles size={12} />
                              OTP sent to {email}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full h-12 md:h-14 rounded-2xl text-base font-bold relative overflow-hidden ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                      } text-white shadow-lg shadow-indigo-500/25`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <LogIn size={18} className="mr-2" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 md:mt-8 text-center space-y-4">
                  <p className="text-xs md:text-sm opacity-60">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold text-indigo-500 hover:text-indigo-400 transition-colors">
                      Create one →
                    </Link>
                  </p>
                  <p className="text-xs md:text-sm opacity-60">
                    Or try{" "}
                    <Link to="/otp-login" className="font-bold text-green-500 hover:text-green-400 transition-colors flex items-center justify-center gap-1">
                      <KeyRound size={14} />
                      Passwordless OTP Login →
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
      </div>
    </div>
  );
}

export { Login };

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { validateEmail } from '../utils/validators';
import { authService } from '../utils/authService';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

const OTPLogin = ({ onSuccess }) => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExpiry, setOtpExpiry] = useState(null);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // OTP expiry timer
  useEffect(() => {
    if (otpExpiry) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = otpExpiry - now;
        if (diff <= 0) {
          setOtpExpiry(null);
          toast.error('OTP has expired. Please request a new one.');
          setStep('email');
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [otpExpiry]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await authService.sendOTP(email);
      toast.success('OTP sent to your email!', {
        description: 'Please check your inbox and enter the 6-digit code.',
      });
      setStep('otp');
      setResendCooldown(30);
      setOtpExpiry(new Date(Date.now() + 5 * 60 * 1000)); // 5 minutes
    } catch (error) {
      toast.error('Failed to send OTP', {
        description: error.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOTP(email, otp);
      toast.success('Login successful!', {
        description: 'Welcome back!',
      });
      
      if (onSuccess) {
        onSuccess(response.data);
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('Invalid OTP', {
        description: error.message || 'Please check your code and try again',
      });
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    try {
      await authService.resendOTP(email);
      toast.success('OTP resent successfully!');
      setResendCooldown(30);
      setOtpExpiry(new Date(Date.now() + 5 * 60 * 1000));
      setOtp('');
    } catch (error) {
      toast.error('Failed to resend OTP', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getExpiryTimeRemaining = () => {
    if (!otpExpiry) return null;
    const now = new Date();
    const diff = otpExpiry - now;
    if (diff <= 0) return '00:00';
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-green-100">
              {step === 'email' ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
            </p>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 'email' ? (
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOTP}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          emailError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                      />
                    </div>
                    {emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {emailError}
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send OTP</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyOTP}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter 6-Digit OTP
                      </label>
                      {otpExpiry && (
                        <span className="text-sm text-gray-600 font-mono">
                          ⏱️ {getExpiryTimeRemaining()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-center mb-2">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        disabled={loading}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <p className="text-sm text-gray-600 text-center mt-4">
                      Sent to <span className="font-semibold">{email}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setStep('email');
                          setOtp('');
                          setOtpExpiry(null);
                        }}
                        className="text-green-600 hover:text-green-700 ml-2 underline"
                      >
                        Change
                      </button>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Verify & Login</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading || resendCooldown > 0}
                      className="text-sm text-gray-600 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendCooldown > 0
                        ? `Resend OTP in ${resendCooldown}s`
                        : 'Resend OTP'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              🔒 Your data is secure and encrypted
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          <p>
            Having trouble? Contact{' '}
            <a href="mailto:support@farmmarket.com" className="text-green-600 hover:underline">
              support@farmmarket.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OTPLogin;

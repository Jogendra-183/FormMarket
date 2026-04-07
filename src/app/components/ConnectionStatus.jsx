import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, X } from 'lucide-react';
import { apiConfig, healthApi } from '../utils/api';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const online = await healthApi.check();
      setIsOnline(online);
      if (online) setIsDismissed(false); // Reset dismiss when back online
    };

    // Initial check
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    // Also check on window focus
    const handleFocus = () => checkConnection();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleRetry = async () => {
    setIsChecking(true);
    const online = await healthApi.check();
    setIsOnline(online);
    setIsChecking(false);
    
    if (online) {
      setShowSuccess(true);
      setIsDismissed(false);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {!isOnline && !isDismissed && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 flex items-center justify-center gap-3 text-sm font-medium shadow-lg"
        >
          <WifiOff size={16} className="animate-pulse" />
          <span>Server connection unavailable - App works in offline mode</span>
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isChecking ? 'animate-spin' : ''} />
            <span>Retry</span>
          </button>
          <button
            onClick={handleDismiss}
            className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
            title="Dismiss"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
      
      {showSuccess && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium shadow-lg"
        >
          <CheckCircle2 size={16} />
          <span>Connection restored!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Small indicator for dashboard use
export function ConnectionIndicator({ className = '' }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkStatus = () => setIsOnline(apiConfig.isOnline);
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'} ${isOnline ? '' : 'animate-pulse'}`} />
      <span className="text-xs text-muted-foreground">
        {isOnline ? 'Connected' : 'Offline'}
      </span>
    </div>
  );
}

export default ConnectionStatus;

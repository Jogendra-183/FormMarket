import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

// Simple working version for testing
export function ImageBasedCharacter({ 
  inputFocus, 
  emailValue = "", 
  passwordValue = "", 
  isTyping = false,
  theme = 'light' 
}) {
  const [currentState, setCurrentState] = useState('idle');
  const [emotion, setEmotion] = useState('happy');
  
  useEffect(() => {
    if (inputFocus === 'email') {
      setCurrentState('email');
      setEmotion('excited');
    } else if (inputFocus === 'password') {
      setCurrentState('password');
      setEmotion('surprised');
    } else if (inputFocus === 'role') {
      setCurrentState('role');
      setEmotion('thinking');
    } else {
      setCurrentState('idle');
      setEmotion('happy');
    }
  }, [inputFocus]);

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center h-full relative overflow-hidden">
      {/* Simple background */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-indigo-950/50 to-purple-950/50' 
          : 'bg-gradient-to-br from-indigo-50 to-purple-50'
      }`} />

      {/* Character placeholder */}
      <div className="relative z-10 text-center">
        <motion.div
          className="text-9xl"
          animate={{
            y: [0, -10, 0],
            rotate: currentState === 'email' ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {currentState === 'password' ? '🙈' : 
           currentState === 'email' ? '😊' :
           currentState === 'role' ? '🤔' : '👋'}
        </motion.div>
        
        {/* Simple message */}
        <motion.p 
          className={`mt-4 text-lg font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentState === 'idle' && "Hey! Ready to log in?"}
          {currentState === 'email' && "Looking good! 😊"}
          {currentState === 'password' && "I won't peek! 🙈"}
          {currentState === 'role' && "Hmm, let me think... 🤔"}
        </motion.p>
      </div>
    </div>
  );
}

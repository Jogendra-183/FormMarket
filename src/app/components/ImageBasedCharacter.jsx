import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback, useMemo } from "react";

// 3D Animated Lamp Character Component
const LampCharacter = ({ 
  emotion = 'happy', 
  lookDirection = { x: 0, y: 0 }, 
  isBlinking = false,
  isCoveringEyes = false,
  isShaking = false,
  glowColor = '#fbbf24',
  glowIntensity = 0.5
}) => {
  // Eye positions based on look direction
  const eyeOffsetX = lookDirection.x * 8;
  const eyeOffsetY = lookDirection.y * 5;
  
  // Facial expressions
  const getExpression = () => {
    switch(emotion) {
      case 'excited':
        return {
          leftEyeScale: 1.2,
          rightEyeScale: 1.2,
          mouthPath: "M 115 195 Q 140 220 165 195",
          eyebrowAngle: -15,
          cheekOpacity: 0.8
        };
      case 'confused':
        return {
          leftEyeScale: 0.9,
          rightEyeScale: 1.1,
          mouthPath: "M 120 200 Q 140 195 160 205",
          eyebrowAngle: 10,
          cheekOpacity: 0.3
        };
      case 'surprised':
        return {
          leftEyeScale: 1.4,
          rightEyeScale: 1.4,
          mouthPath: "M 130 200 Q 140 215 150 200",
          eyebrowAngle: -20,
          cheekOpacity: 0.5
        };
      case 'sad':
        return {
          leftEyeScale: 0.8,
          rightEyeScale: 0.8,
          mouthPath: "M 120 210 Q 140 195 160 210",
          eyebrowAngle: 15,
          cheekOpacity: 0.2
        };
      case 'thinking':
        return {
          leftEyeScale: 1,
          rightEyeScale: 0.7,
          mouthPath: "M 125 202 L 155 202",
          eyebrowAngle: 5,
          cheekOpacity: 0.4
        };
      case 'shy':
        return {
          leftEyeScale: 0.6,
          rightEyeScale: 0.6,
          mouthPath: "M 130 200 Q 140 205 150 200",
          eyebrowAngle: 0,
          cheekOpacity: 1
        };
      default: // happy
        return {
          leftEyeScale: 1,
          rightEyeScale: 1,
          mouthPath: "M 120 195 Q 140 210 160 195",
          eyebrowAngle: -5,
          cheekOpacity: 0.6
        };
    }
  };

  const expr = getExpression();

  return (
    <svg 
      width="280" 
      height="350" 
      viewBox="0 0 280 350" 
      className="w-64 h-auto"
      style={{
        filter: `drop-shadow(0 0 ${20 + glowIntensity * 30}px ${glowColor})`,
        transform: isShaking ? 'translateX(0)' : 'none'
      }}
    >
      <defs>
        {/* Lamp glow gradient */}
        <radialGradient id="lampGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={glowColor} stopOpacity={0.9 + glowIntensity * 0.1} />
          <stop offset="50%" stopColor={glowColor} stopOpacity={0.6} />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
        </radialGradient>
        
        {/* 3D shading gradient */}
        <linearGradient id="lampShade3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="30%" stopColor="#fcd34d" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        
        {/* Base gradient */}
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="50%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        
        {/* Face glow */}
        <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fcd34d" />
        </radialGradient>

        {/* Eye shine */}
        <radialGradient id="eyeShine" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind lamp */}
      <ellipse 
        cx="140" 
        cy="150" 
        rx="100" 
        ry="80" 
        fill={glowColor}
        opacity={0.15 + glowIntensity * 0.2}
        className="blur-xl"
      />

      {/* Lamp Base Stand */}
      <ellipse cx="140" cy="330" rx="50" ry="12" fill="url(#baseGradient)" />
      <rect x="130" y="280" width="20" height="50" fill="url(#baseGradient)" rx="3" />
      
      {/* Flexible Neck/Arm */}
      <path 
        d={`M 140 280 
            Q 140 260 ${135 + lookDirection.x * 5} 240 
            Q ${130 + lookDirection.x * 8} 220 ${135 + lookDirection.x * 10} 200`}
        stroke="#4b5563"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d={`M 140 280 
            Q 140 260 ${135 + lookDirection.x * 5} 240 
            Q ${130 + lookDirection.x * 8} 220 ${135 + lookDirection.x * 10} 200`}
        stroke="#6b7280"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Lamp Head / Shade - 3D styled */}
      <g transform={`translate(${lookDirection.x * 10}, ${lookDirection.y * 5})`}>
        {/* Outer shade with 3D effect */}
        <ellipse cx="140" cy="100" rx="75" ry="55" fill="url(#lampShade3D)" />
        
        {/* Inner glow area */}
        <ellipse cx="140" cy="115" rx="60" ry="45" fill="url(#lampGlow)" />
        
        {/* 3D rim highlight */}
        <ellipse 
          cx="140" 
          cy="60" 
          rx="65" 
          ry="20" 
          fill="none" 
          stroke="#fef3c7" 
          strokeWidth="3"
          opacity="0.7"
        />
        
        {/* Face area */}
        <ellipse cx="140" cy="140" rx="55" ry="50" fill="url(#faceGlow)" />

        {/* Eyes */}
        {!isCoveringEyes ? (
          <>
            {/* Left Eye */}
            <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
              <ellipse 
                cx="115" 
                cy="130" 
                rx={12 * expr.leftEyeScale} 
                ry={isBlinking ? 2 : 14 * expr.leftEyeScale} 
                fill="url(#eyeShine)"
                stroke="#374151"
                strokeWidth="2"
              />
              {!isBlinking && (
                <>
                  <circle cx={115 + eyeOffsetX * 0.3} cy={130 + eyeOffsetY * 0.3} r={6 * expr.leftEyeScale} fill="#1f2937" />
                  <circle cx={113 + eyeOffsetX * 0.2} cy={127 + eyeOffsetY * 0.2} r={2} fill="white" />
                </>
              )}
            </g>

            {/* Right Eye */}
            <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
              <ellipse 
                cx="165" 
                cy="130" 
                rx={12 * expr.rightEyeScale} 
                ry={isBlinking ? 2 : 14 * expr.rightEyeScale} 
                fill="url(#eyeShine)"
                stroke="#374151"
                strokeWidth="2"
              />
              {!isBlinking && (
                <>
                  <circle cx={165 + eyeOffsetX * 0.3} cy={130 + eyeOffsetY * 0.3} r={6 * expr.rightEyeScale} fill="#1f2937" />
                  <circle cx={163 + eyeOffsetX * 0.2} cy={127 + eyeOffsetY * 0.2} r={2} fill="white" />
                </>
              )}
            </g>
          </>
        ) : (
          /* Covering eyes - show hands/covers */
          <>
            <ellipse cx="115" cy="130" rx="18" ry="16" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
            <ellipse cx="165" cy="130" rx="18" ry="16" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
            {/* Finger lines */}
            <line x1="100" y1="125" x2="100" y2="140" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            <line x1="108" y1="122" x2="108" y2="140" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            <line x1="180" y1="125" x2="180" y2="140" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            <line x1="172" y1="122" x2="172" y2="140" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Eyebrows */}
        <path 
          d={`M 100 ${115 + expr.eyebrowAngle * 0.3} Q 115 ${110 + expr.eyebrowAngle} 130 ${115 - expr.eyebrowAngle * 0.3}`}
          stroke="#92400e"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path 
          d={`M 150 ${115 - expr.eyebrowAngle * 0.3} Q 165 ${110 + expr.eyebrowAngle} 180 ${115 + expr.eyebrowAngle * 0.3}`}
          stroke="#92400e"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cheeks - blush */}
        <ellipse cx="95" cy="155" rx="12" ry="8" fill="#fca5a5" opacity={expr.cheekOpacity} />
        <ellipse cx="185" cy="155" rx="12" ry="8" fill="#fca5a5" opacity={expr.cheekOpacity} />

        {/* Mouth */}
        <path 
          d={expr.mouthPath}
          stroke="#92400e"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Light bulb glow effect at top */}
        <circle cx="140" cy="50" r="15" fill={glowColor} opacity={0.4 + glowIntensity * 0.4}>
          <animate attributeName="opacity" values={`${0.4 + glowIntensity * 0.3};${0.7 + glowIntensity * 0.3};${0.4 + glowIntensity * 0.3}`} dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="50" r="8" fill="#fef3c7" opacity="0.9" />
      </g>
    </svg>
  );
};

// Main Export Component with full interaction logic
export function ImageBasedCharacter({ 
  inputFocus, 
  emailValue = "", 
  passwordValue = "", 
  isTyping = false,
  theme = 'light',
  loginError = false,
  cursorPosition = null
}) {
  const [emotion, setEmotion] = useState('happy');
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isCoveringEyes, setIsCoveringEyes] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [glowColor, setGlowColor] = useState('#fbbf24');
  const [message, setMessage] = useState("Hey! Ready to log in? 👋");

  const isDark = theme === 'dark';

  // Email validation helper
  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  }, [emailValue]);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isCoveringEyes && Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);
    return () => clearInterval(blinkInterval);
  }, [isCoveringEyes]);

  // Handle cursor following
  useEffect(() => {
    if (cursorPosition && inputFocus) {
      const centerX = 140;
      const normalizedX = (cursorPosition - centerX) / 100;
      setLookDirection(prev => ({
        x: Math.max(-1, Math.min(1, normalizedX)),
        y: prev.y
      }));
    }
  }, [cursorPosition, inputFocus]);

  // Handle input focus and state changes
  useEffect(() => {
    if (inputFocus === 'email') {
      setIsCoveringEyes(false);
      setLookDirection({ x: 0.3, y: 0.2 });
      
      // Determine emotion based on email validity
      if (emailValue.length === 0) {
        setEmotion('happy');
        setMessage("Type your email! 📧");
        setGlowColor('#fbbf24');
        setGlowIntensity(0.5);
      } else if (isValidEmail) {
        setEmotion('excited');
        setMessage("Perfect email! 🎉");
        setGlowColor('#22c55e');
        setGlowIntensity(0.8);
      } else if (emailValue.includes('@')) {
        setEmotion('thinking');
        setMessage("Almost there... 🤔");
        setGlowColor('#3b82f6');
        setGlowIntensity(0.6);
      } else if (emailValue.length > 0 && !/^[a-zA-Z0-9@._-]+$/.test(emailValue)) {
        setEmotion('confused');
        setMessage("Hmm, that looks odd... 😕");
        setGlowColor('#f59e0b');
        setGlowIntensity(0.4);
      } else {
        setEmotion('happy');
        setMessage("Looking good! 😊");
        setGlowColor('#fbbf24');
        setGlowIntensity(0.5 + (emailValue.length * 0.02));
      }
    } else if (inputFocus === 'password') {
      setIsCoveringEyes(true);
      setEmotion('shy');
      setLookDirection({ x: 0, y: 0.5 });
      setGlowColor('#a855f7');
      
      if (passwordValue.length === 0) {
        setMessage("I won't peek! 🙈");
        setGlowIntensity(0.4);
      } else if (passwordValue.length < 6) {
        setMessage("Make it stronger! 💪");
        setGlowIntensity(0.5);
      } else if (passwordValue.length >= 8) {
        setMessage("Super secure! 🔐");
        setGlowIntensity(0.8);
      } else {
        setMessage("Good password! 👍");
        setGlowIntensity(0.6);
      }
    } else if (inputFocus === 'role') {
      setIsCoveringEyes(false);
      setEmotion('thinking');
      setLookDirection({ x: -0.3, y: -0.2 });
      setMessage("Choose wisely... 🤔");
      setGlowColor('#3b82f6');
      setGlowIntensity(0.6);
    } else {
      setIsCoveringEyes(false);
      setEmotion('happy');
      setLookDirection({ x: 0, y: 0 });
      setMessage("Hey! Ready to log in? 👋");
      setGlowColor('#fbbf24');
      setGlowIntensity(0.5);
    }
  }, [inputFocus, emailValue, passwordValue, isValidEmail]);

  // Handle login error - shake animation
  useEffect(() => {
    if (loginError) {
      setIsShaking(true);
      setEmotion('sad');
      setMessage("Oops! Try again 😢");
      setGlowColor('#ef4444');
      setGlowIntensity(0.7);
      
      setTimeout(() => {
        setIsShaking(false);
        setEmotion('happy');
        setGlowColor('#fbbf24');
      }, 1000);
    }
  }, [loginError]);

  // Typing excitement boost
  useEffect(() => {
    if (isTyping && inputFocus === 'email') {
      setGlowIntensity(prev => Math.min(1, prev + 0.1));
    }
  }, [isTyping, inputFocus]);

  return (
    <div className="flex items-center justify-center h-full relative overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: isDark 
            ? `radial-gradient(ellipse at center, ${glowColor}15 0%, #0f172a 50%, #020617 100%)`
            : `radial-gradient(ellipse at center, ${glowColor}20 0%, #f8fafc 50%, #e2e8f0 100%)`
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 4) * 2,
              height: 4 + (i % 4) * 2,
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              background: `${glowColor}${isDark ? '60' : '40'}`,
              boxShadow: `0 0 ${10 + i % 5}px ${glowColor}`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glowing orb behind character */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          background: glowColor,
        }}
        animate={{
          opacity: [0.1 + glowIntensity * 0.2, 0.2 + glowIntensity * 0.3, 0.1 + glowIntensity * 0.2],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Character Container with 3D transforms */}
      <motion.div 
        className="relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: lookDirection.x * 10,
          rotateX: -lookDirection.y * 5,
          y: isTyping ? [0, -8, 0] : [0, -5, 0],
          x: isShaking ? [-10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          rotateY: { duration: 0.3 },
          rotateX: { duration: 0.3 },
          y: { duration: isTyping ? 0.3 : 2.5, repeat: Infinity, ease: "easeInOut" },
          x: isShaking ? { duration: 0.5, ease: "easeInOut" } : {},
        }}
      >
        <LampCharacter 
          emotion={emotion}
          lookDirection={lookDirection}
          isBlinking={isBlinking}
          isCoveringEyes={isCoveringEyes}
          isShaking={isShaking}
          glowColor={glowColor}
          glowIntensity={glowIntensity}
        />

        {/* Sparkle effects when excited */}
        <AnimatePresence>
          {(emotion === 'excited' || (isTyping && inputFocus === 'email')) && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${25 + (i % 4) * 15}%`,
                    top: `${15 + Math.floor(i / 4) * 20}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [-5, -25],
                    rotate: [0, 180],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#fbbf24' : '#22c55e',
                      boxShadow: `0 0 10px ${i % 2 === 0 ? '#fbbf24' : '#22c55e'}`
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Confusion marks */}
        <AnimatePresence>
          {emotion === 'confused' && (
            <motion.div
              className="absolute -top-4 right-0 text-3xl"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.2, 1],
                rotate: [-10, 10, -10],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, rotate: { repeat: Infinity, duration: 1 } }}
            >
              ❓
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          className={`absolute top-8 right-8 max-w-[200px] px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-sm ${
            isDark 
              ? 'bg-white/10 text-white border border-white/20' 
              : 'bg-white/90 text-gray-800 border border-gray-200'
          }`}
          style={{
            boxShadow: `0 0 30px ${glowColor}30`
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -3, 0],
          }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{
            duration: 0.3,
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <p className="font-bold text-sm">{message}</p>
          {/* Speech bubble tail */}
          <div 
            className={`absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 
              border-t-[8px] border-t-transparent 
              border-r-[12px] ${isDark ? 'border-r-white/10' : 'border-r-white/90'}
              border-b-[8px] border-b-transparent`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Email validation indicator */}
      <AnimatePresence>
        {inputFocus === 'email' && emailValue.length > 0 && (
          <motion.div
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full backdrop-blur-sm ${
              isValidEmail 
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-sm font-semibold flex items-center gap-2">
              {isValidEmail ? (
                <>✓ Valid Email</>
              ) : (
                <>⋯ Keep typing...</>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password strength indicator */}
      <AnimatePresence>
        {inputFocus === 'password' && passwordValue.length > 0 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-2 rounded-full"
                  style={{
                    background: i < Math.min(4, Math.floor(passwordValue.length / 2))
                      ? i < 1 ? '#ef4444' : i < 2 ? '#f59e0b' : i < 3 ? '#22c55e' : '#10b981'
                      : isDark ? '#374151' : '#d1d5db'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <p className={`text-xs mt-1 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {passwordValue.length < 4 ? 'Weak' : passwordValue.length < 6 ? 'Fair' : passwordValue.length < 8 ? 'Good' : 'Strong'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light rays effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/4 left-1/2 w-1 h-32 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${glowColor}, transparent)`,
              transform: `translateX(-50%) rotate(${-75 + i * 30}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

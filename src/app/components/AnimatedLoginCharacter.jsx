import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export function AnimatedLoginCharacter({ 
  inputFocus, 
  emailValue, 
  passwordValue, 
  isTyping,
  theme 
}) {
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  
  // Eye positions with smooth spring animation
  const eyeX = useSpring(0, { stiffness: 300, damping: 30 });
  const eyeY = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Hand positions for covering eyes
  const handY = useSpring(0, { stiffness: 200, damping: 25 });
  
  useEffect(() => {
    if (inputFocus === 'email') {
      // Look at email field (slightly down)
      eyeX.set(5);
      eyeY.set(8);
      setIsLookingUp(false);
      setIsPeeking(false);
      handY.set(0);
    } else if (inputFocus === 'password') {
      // Cover eyes when password is being typed
      eyeX.set(0);
      eyeY.set(0);
      setIsLookingUp(false);
      setIsPeeking(true);
      handY.set(-20);
    } else if (inputFocus === 'role') {
      // Look up at role selector
      eyeX.set(0);
      eyeY.set(-10);
      setIsLookingUp(true);
      setIsPeeking(false);
      handY.set(0);
    } else {
      // Neutral position
      eyeX.set(0);
      eyeY.set(0);
      setIsLookingUp(false);
      setIsPeeking(false);
      handY.set(0);
    }
  }, [inputFocus, eyeX, eyeY, handY]);

  // Typing animation - eyes move side to side
  useEffect(() => {
    if (isTyping && inputFocus === 'email') {
      const interval = setInterval(() => {
        eyeX.set(Math.random() * 10 - 5);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isTyping, inputFocus, eyeX]);

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center h-full relative">
      {/* Decorative circles in background */}
      <motion.div
        className={`absolute w-64 h-64 rounded-full ${
          isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'
        } blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <svg
        width="400"
        height="500"
        viewBox="0 0 400 500"
        className="relative z-10"
      >
        {/* Character Body */}
        <motion.g
          animate={{
            y: isTyping ? [0, -5, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: isTyping ? Infinity : 0,
          }}
        >
          {/* Head */}
          <motion.ellipse
            cx="200"
            cy="180"
            rx="80"
            ry="85"
            fill={isDark ? "#fbbf24" : "#f59e0b"}
            stroke={isDark ? "#d97706" : "#ea580c"}
            strokeWidth="3"
            animate={{
              rotate: inputFocus === 'email' ? 5 : inputFocus === 'role' ? -8 : 0,
            }}
            style={{ originX: '200px', originY: '180px' }}
          />

          {/* Hair */}
          <motion.path
            d="M 120 140 Q 120 100 160 90 Q 200 85 240 90 Q 280 100 280 140"
            fill={isDark ? "#78350f" : "#451a03"}
            animate={{
              d: isLookingUp 
                ? "M 120 135 Q 120 95 160 85 Q 200 80 240 85 Q 280 95 280 135"
                : "M 120 140 Q 120 100 160 90 Q 200 85 240 90 Q 280 100 280 140"
            }}
          />

          {/* Eyes */}
          <g>
            {/* Left Eye */}
            <ellipse
              cx="170"
              cy="170"
              rx="15"
              ry={isPeeking ? "5" : "18"}
              fill="white"
              stroke={isDark ? "#1f2937" : "#374151"}
              strokeWidth="2"
            />
            {!isPeeking && (
              <motion.circle
                cx="170"
                cy="170"
                r="8"
                fill={isDark ? "#1f2937" : "#374151"}
                style={{
                  x: eyeX,
                  y: eyeY,
                }}
              />
            )}

            {/* Right Eye */}
            <ellipse
              cx="230"
              cy="170"
              rx="15"
              ry={isPeeking ? "5" : "18"}
              fill="white"
              stroke={isDark ? "#1f2937" : "#374151"}
              strokeWidth="2"
            />
            {!isPeeking && (
              <motion.circle
                cx="230"
                cy="170"
                r="8"
                fill={isDark ? "#1f2937" : "#374151"}
                style={{
                  x: eyeX,
                  y: eyeY,
                }}
              />
            )}
          </g>

          {/* Hands covering eyes during password input */}
          <motion.g
            style={{ y: handY }}
          >
            {/* Left Hand */}
            <motion.ellipse
              cx="160"
              cy="190"
              rx="25"
              ry="20"
              fill={isDark ? "#fbbf24" : "#f59e0b"}
              stroke={isDark ? "#d97706" : "#ea580c"}
              strokeWidth="2"
              opacity={isPeeking ? 1 : 0}
            />
            {/* Right Hand */}
            <motion.ellipse
              cx="240"
              cy="190"
              rx="25"
              ry="20"
              fill={isDark ? "#fbbf24" : "#f59e0b"}
              stroke={isDark ? "#d97706" : "#ea580c"}
              strokeWidth="2"
              opacity={isPeeking ? 1 : 0}
            />
            {/* Fingers */}
            {isPeeking && (
              <>
                <rect x="148" y="185" width="4" height="15" rx="2" fill={isDark ? "#d97706" : "#ea580c"} />
                <rect x="155" y="183" width="4" height="17" rx="2" fill={isDark ? "#d97706" : "#ea580c"} />
                <rect x="162" y="185" width="4" height="15" rx="2" fill={isDark ? "#d97706" : "#ea580c"} />
                
                <rect x="248" y="185" width="4" height="15" rx="2" fill={isDark ? "#d97706" : "#ea580c"} />
                <rect x="241" y="183" width="4" height="17" rx="2" fill={isDark ? "#d97706" : "#ea580c"} />
                <rect x="234" y="185" width="4" height="15" rx="2" fill={isDark ? "#d97706" : "#ea580c"} />
              </>
            )}
          </motion.g>

          {/* Nose */}
          <ellipse
            cx="200"
            cy="185"
            rx="8"
            ry="10"
            fill={isDark ? "#d97706" : "#ea580c"}
          />

          {/* Mouth - changes based on state */}
          <motion.path
            d={
              inputFocus === 'password' 
                ? "M 180 210 Q 200 205 220 210" // Slight smile when peeking
                : emailValue.length > 0 || passwordValue.length > 0
                ? "M 180 210 Q 200 220 220 210" // Happy smile when typing
                : "M 180 210 Q 200 210 220 210" // Neutral
            }
            stroke={isDark ? "#78350f" : "#451a03"}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Neck */}
          <rect
            x="185"
            y="260"
            width="30"
            height="40"
            fill={isDark ? "#fbbf24" : "#f59e0b"}
            stroke={isDark ? "#d97706" : "#ea580c"}
            strokeWidth="2"
          />

          {/* Body/Shirt */}
          <motion.path
            d="M 160 300 L 160 380 Q 160 400 180 400 L 220 400 Q 240 400 240 380 L 240 300 Q 240 290 230 285 L 210 275 L 190 275 L 170 285 Q 160 290 160 300"
            fill={isDark ? "#3b82f6" : "#2563eb"}
            stroke={isDark ? "#1e40af" : "#1e3a8a"}
            strokeWidth="3"
          />

          {/* Arms */}
          {!isPeeking && (
            <>
              {/* Left Arm */}
              <motion.path
                d="M 165 310 Q 120 330 110 380"
                stroke={isDark ? "#fbbf24" : "#f59e0b"}
                strokeWidth="20"
                strokeLinecap="round"
                animate={{
                  d: isTyping 
                    ? "M 165 310 Q 130 320 120 360"
                    : "M 165 310 Q 120 330 110 380"
                }}
              />
              {/* Left Hand */}
              <motion.circle
                cx="110"
                cy="380"
                r="15"
                fill={isDark ? "#fbbf24" : "#f59e0b"}
                stroke={isDark ? "#d97706" : "#ea580c"}
                strokeWidth="2"
                animate={{
                  cx: isTyping ? 120 : 110,
                  cy: isTyping ? 360 : 380,
                }}
              />

              {/* Right Arm */}
              <motion.path
                d="M 235 310 Q 280 330 290 380"
                stroke={isDark ? "#fbbf24" : "#f59e0b"}
                strokeWidth="20"
                strokeLinecap="round"
                animate={{
                  d: isTyping 
                    ? "M 235 310 Q 270 320 280 360"
                    : "M 235 310 Q 280 330 290 380"
                }}
              />
              {/* Right Hand */}
              <motion.circle
                cx="290"
                cy="380"
                r="15"
                fill={isDark ? "#fbbf24" : "#f59e0b"}
                stroke={isDark ? "#d97706" : "#ea580c"}
                strokeWidth="2"
                animate={{
                  cx: isTyping ? 280 : 290,
                  cy: isTyping ? 360 : 380,
                }}
              />
            </>
          )}

          {/* Legs */}
          <rect
            x="170"
            y="400"
            width="20"
            height="70"
            fill={isDark ? "#1e3a8a" : "#1e40af"}
            rx="10"
          />
          <rect
            x="210"
            y="400"
            width="20"
            height="70"
            fill={isDark ? "#1e3a8a" : "#1e40af"}
            rx="10"
          />

          {/* Feet */}
          <ellipse
            cx="180"
            cy="470"
            rx="20"
            ry="10"
            fill={isDark ? "#78350f" : "#451a03"}
          />
          <ellipse
            cx="220"
            cy="470"
            rx="20"
            ry="10"
            fill={isDark ? "#78350f" : "#451a03"}
          />
        </motion.g>
      </svg>

      {/* Floating particles when typing */}
      {isTyping && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                isDark ? 'bg-indigo-400' : 'bg-indigo-500'
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Welcome text bubble */}
      {!inputFocus && (
        <motion.div
          className={`absolute top-10 right-10 px-6 py-3 rounded-2xl ${
            isDark 
              ? 'bg-white/10 border-white/20 text-white' 
              : 'bg-black/10 border-black/20 text-gray-900'
          } border backdrop-blur-xl`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold">Hey! Ready to log in? 👋</p>
        </motion.div>
      )}

      {/* Status messages */}
      {inputFocus === 'password' && (
        <motion.div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl ${
            isDark 
              ? 'bg-white/10 border-white/20 text-white' 
              : 'bg-black/10 border-black/20 text-gray-900'
          } border backdrop-blur-xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-sm font-semibold">🙈 I won't peek, promise!</p>
        </motion.div>
      )}
    </div>
  );
}

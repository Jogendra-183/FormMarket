import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Dust particle component
const DustParticle = ({ delay, duration, startX, startY, theme }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        background: theme === 'dark' 
          ? `rgba(255, 215, 120, ${Math.random() * 0.6 + 0.2})`
          : `rgba(180, 140, 60, ${Math.random() * 0.5 + 0.2})`,
        left: `${startX}%`,
        top: `${startY}%`,
        filter: 'blur(0.5px)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.6, 0],
        scale: [0, 1, 1.2, 0.5],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * -150 - 50],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
};

// Light ray component
const LightRay = ({ angle, delay, theme }) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 origin-bottom"
      style={{
        width: '2px',
        height: '300px',
        background: theme === 'dark'
          ? 'linear-gradient(to top, rgba(255, 200, 100, 0.3), transparent)'
          : 'linear-gradient(to top, rgba(200, 160, 60, 0.25), transparent)',
        transform: `rotate(${angle}deg) translateX(-50%)`,
        filter: 'blur(2px)',
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.6, 0.4], scaleY: [0, 1, 1.2] }}
      transition={{
        duration: 1.5,
        delay: delay + 0.8,
        ease: "easeOut",
      }}
    />
  );
};

// Logo particle that gathers to form the logo
const LogoParticle = ({ targetX, targetY, delay }) => {
  const startX = Math.random() * 200 - 100;
  const startY = Math.random() * 200 - 100;
  
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-amber-400"
      style={{
        left: '50%',
        top: '50%',
        boxShadow: '0 0 6px rgba(255, 200, 100, 0.8)',
      }}
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        x: targetX, 
        y: targetY, 
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0]
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

function CinematicIntro({ onComplete, theme = 'dark' }) {
  const [phase, setPhase] = useState('black'); // black -> sunrise -> particles -> logo -> tagline -> fade
  const [showSkip, setShowSkip] = useState(false);
  const containerRef = useRef(null);

  // Generate dust particles
  const dustParticles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: 0.5 + Math.random() * 2,
    duration: 2 + Math.random() * 2,
    startX: 40 + Math.random() * 20,
    startY: 50 + Math.random() * 20,
  }));

  // Generate light rays
  const lightRays = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30) - 180,
    delay: Math.random() * 0.5,
  }));

  // Generate logo particles
  const logoParticles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    targetX: (Math.random() - 0.5) * 300,
    targetY: (Math.random() - 0.5) * 100,
    delay: 1.5 + Math.random() * 0.8,
  }));

  useEffect(() => {
    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    // Phase transitions
    const timers = [
      setTimeout(() => setPhase('sunrise'), 300),
      setTimeout(() => setPhase('particles'), 800),
      setTimeout(() => setPhase('logo'), 2000),
      setTimeout(() => setPhase('tagline'), 3200),
      setTimeout(() => setPhase('fade'), 4200),
      setTimeout(() => onComplete?.(), 5000),
    ];

    return () => {
      clearTimeout(skipTimer);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('fade');
    setTimeout(() => onComplete?.(), 300);
  };

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: theme === 'dark' ? '#000' : '#0a0a0a',
          }}
        >
          {/* Black background with vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
            }}
          />

          {/* Sunrise glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={phase !== 'black' ? {
              opacity: [0, 0.8, 0.6],
              scale: [0, 1, 1.5],
            } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Inner warm glow */}
            <div 
              className="absolute rounded-full"
              style={{
                width: '400px',
                height: '400px',
                left: '-200px',
                top: '-200px',
                background: 'radial-gradient(circle, rgba(255, 180, 80, 0.4) 0%, rgba(255, 140, 50, 0.2) 40%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            {/* Outer golden glow */}
            <div 
              className="absolute rounded-full"
              style={{
                width: '600px',
                height: '600px',
                left: '-300px',
                top: '-300px',
                background: 'radial-gradient(circle, rgba(255, 200, 100, 0.15) 0%, rgba(100, 180, 100, 0.1) 50%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </motion.div>

          {/* Light rays */}
          {(phase === 'particles' || phase === 'logo' || phase === 'tagline') && (
            <div className="absolute inset-0 pointer-events-none">
              {lightRays.map((ray) => (
                <LightRay key={ray.id} {...ray} theme={theme} />
              ))}
            </div>
          )}

          {/* Ambient fog */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={phase !== 'black' ? { opacity: 0.3 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              mixBlendMode: 'soft-light',
            }}
          />

          {/* Dust particles */}
          {(phase === 'particles' || phase === 'logo' || phase === 'tagline') && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {dustParticles.map((particle) => (
                <DustParticle key={particle.id} {...particle} theme={theme} />
              ))}
            </div>
          )}

          {/* Logo particles gathering */}
          {(phase === 'logo' || phase === 'tagline') && (
            <div className="absolute inset-0 pointer-events-none">
              {logoParticles.map((particle) => (
                <LogoParticle key={particle.id} {...particle} />
              ))}
            </div>
          )}

          {/* Main Logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={(phase === 'logo' || phase === 'tagline' || phase === 'fade') ? {
              opacity: phase === 'fade' ? 0 : 1,
              scale: 1,
              y: 0,
            } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Logo glow background */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={(phase === 'logo' || phase === 'tagline') ? {
                opacity: [0, 0.6, 0.4],
                scale: [0.5, 1.2, 1],
              } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{
                width: '500px',
                height: '200px',
                background: 'radial-gradient(ellipse, rgba(180, 140, 60, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Leaf icon */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={(phase === 'logo' || phase === 'tagline' || phase === 'fade') ? {
                opacity: phase === 'fade' ? 0 : 1,
                scale: 1,
                rotate: 0,
              } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div 
                className="p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(180, 140, 60, 0.3))',
                  boxShadow: '0 0 40px rgba(180, 140, 60, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              >
                <svg 
                  className="w-16 h-16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="url(#leafGradient)" 
                  strokeWidth="1.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2c-5.5 5.5-5 10-4 14.5" />
                  <path d="M12 2c5.5 5.5 5 10 4 14.5" />
                  <path d="M12 2v20" />
                  <path d="M4 10c2.5 1 5.5 1.5 8 1.5s5.5-.5 8-1.5" />
                </svg>
              </div>
            </motion.div>

            {/* Main logo text */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #22c55e 50%, #fbbf24 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(180, 140, 60, 0.5)',
                filter: 'drop-shadow(0 0 30px rgba(180, 140, 60, 0.3))',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={(phase === 'logo' || phase === 'tagline' || phase === 'fade') ? {
                opacity: phase === 'fade' ? 0 : 1,
                y: 0,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              } : {}}
              transition={{ 
                duration: 0.8, 
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              Farmer Marketplace
            </motion.h1>

            {/* Glowing pulse effect */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={(phase === 'tagline') ? {
                opacity: [0, 0.5, 0],
                scale: [1, 1.1, 1.2],
              } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                background: 'radial-gradient(ellipse, rgba(180, 140, 60, 0.2) 0%, transparent 60%)',
              }}
            />

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl font-medium tracking-wide"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 0 20px rgba(180, 140, 60, 0.4)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={(phase === 'tagline' || phase === 'fade') ? {
                opacity: phase === 'fade' ? 0 : [0, 1],
                y: 0,
              } : {}}
              transition={{ duration: 0.6 }}
            >
              Empowering Farmers. Connecting Markets.
            </motion.p>
          </motion.div>

          {/* Cinematic letterbox bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-black"
            initial={{ height: '0%' }}
            animate={{ height: '8%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black"
            initial={{ height: '0%' }}
            animate={{ height: '8%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && phase !== 'fade' && (
              <motion.button
                className="absolute bottom-16 right-8 px-4 py-2 text-sm font-medium text-white/60 hover:text-white/90 transition-colors rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleSkip}
              >
                Skip Intro →
              </motion.button>
            )}
          </AnimatePresence>

          {/* Fade to white transition */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={phase === 'fade' ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              background: theme === 'dark' 
                ? 'radial-gradient(ellipse at center, rgba(20, 20, 30, 1) 0%, rgba(0, 0, 0, 1) 100%)'
                : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { CinematicIntro };

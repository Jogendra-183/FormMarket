import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './ui/utils';

/**
 * 5-SECOND CINEMATIC INTRO VIDEO
 */
export const CinematicIntro = ({ onComplete }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
       document.body.style.overflow = '';
       onComplete();
    }, 5500); 
    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    startX: (Math.random() - 0.5) * 100 + "vw",
    startY: (Math.random() - 0.5) * 100 + "vh",
    endX: (Math.random() - 0.5) * 10 + "vw",
    endY: (Math.random() - 0.5) * 10 + "vh",
    delay: Math.random() * 2
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030504] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
       <motion.div
         className="absolute inset-0 pointer-events-none"
         style={{
           backgroundImage: 'radial-gradient(circle at center, rgba(135, 175, 80, 0.25) 0%, rgba(255,200,50,0.1) 30%, rgba(0,0,0,0) 70%)',
         }}
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: 1, scale: 1.5 }}
         transition={{ duration: 4, ease: 'easeOut' }}
       />

       <motion.div
         className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none z-10"
         style={{
           background: 'conic-gradient(from 90deg at 50% 120%, transparent, rgba(250, 204, 21, 0.15) 35%, rgba(135, 175, 80, 0.2) 45%, transparent 55%)',
           filter: 'blur(50px)',
         }}
         initial={{ opacity: 0, rotate: -5 }}
         animate={{ opacity: 0.8, rotate: 5 }}
         transition={{ duration: 5, ease: 'easeInOut' }}
       />
       
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
         {particles.map((p) => (
           <motion.div
             key={p.id}
             className="absolute w-1.5 h-1.5 bg-amber-200/50 rounded-full blur-[1px]"
             initial={{ 
               x: p.startX, 
               y: p.startY,
               opacity: 0,
               scale: 0
             }}
             animate={{ 
               x: [p.startX, p.endX, 0], 
               y: [p.startY, p.endY, 0],
               opacity: [0, 1, 0],
               scale: [0, 1.5, 0]
             }}
             transition={{ duration: 3.5, delay: p.delay, ease: "easeInOut" }}
           />
         ))}
       </div>

       <motion.div
         className="relative z-30 flex flex-col items-center mt-[-5%]"
         initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
         animate={{ opacity: 1, scale: 1.05, filter: 'blur(0px)' }}
         transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
       >
         <motion.div 
           className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)] text-center px-4"
           animate={{ textShadow: ["0 0 10px rgba(16,185,129,0)", "0 0 50px rgba(16,185,129,0.6)", "0 0 20px rgba(16,185,129,0.3)"] }}
           transition={{ duration: 2, delay: 3.5, repeat: Infinity, repeatType: 'reverse' }}
         >
           Farmer Marketplace
         </motion.div>
         <motion.p
           className="mt-6 text-lg md:text-2xl lg:text-3xl text-amber-50/80 tracking-[0.2em] uppercase font-light text-center px-4"
           initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
           animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
           transition={{ duration: 1.5, delay: 3, ease: 'easeOut' }}
         >
           Empowering Farmers.<br className="md:hidden" /> Connecting Markets.
         </motion.p>
       </motion.div>
    </motion.div>
  );
};

/**
 * CINEMATIC LETTERBOX COMPONENT
 */
export const CinematicOverlay = ({ isActive, onClose }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-[15vh] bg-black transition-transform duration-1000 ease-in-out origin-top scale-y-100 animate-slide-down" />
      <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-black transition-transform duration-1000 ease-in-out origin-bottom scale-y-100 animate-slide-up" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="text-center animate-fade-in-up px-6">
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-4">FOCUS MODE</h2>
          <p className="text-white/60 text-lg uppercase tracking-[0.5em] mb-12">Immersive Visual Experience</p>
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-full transition-all mx-auto"
          >
            <X size={20} />
            <span className="font-bold">Exit Cinema</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * THEME TOGGLE
 */
export const ThemeToggle = ({ theme, toggleTheme, className, inline = false }) => (
  <button 
    onClick={toggleTheme}
    className={cn(
      `p-3 rounded-2xl border transition-all duration-500 group overflow-hidden`,
      inline ? 'z-10' : 'fixed top-8 right-8 z-50',
      theme === 'dark' 
        ? 'bg-white/5 border-white/10 hover:bg-white/10' 
        : 'bg-black/5 border-black/10 hover:bg-black/10',
      className
    )}
    aria-label="Toggle theme"
  >
    <div className="relative w-6 h-6">
      <Sun className={`absolute inset-0 transition-all duration-500 transform ${
        theme === 'dark' 
          ? 'rotate-90 scale-0 opacity-0' 
          : 'rotate-0 scale-100 opacity-100 text-amber-600'
      }`} />
      <Moon className={`absolute inset-0 transition-all duration-500 transform ${
        theme === 'dark' 
          ? 'rotate-0 scale-100 opacity-100 text-indigo-400' 
          : '-rotate-90 scale-0 opacity-0'
      }`} />
    </div>
  </button>
);

/**
 * BACKGROUND REEL
 */
export const CinematicReelBackground = ({ theme, isCinematic }) => {
  const images = [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex(p => (p + 1) % images.length), 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div 
      className="fixed inset-0 -z-10 bg-current transition-colors duration-1000" 
      style={{ color: theme === 'dark' ? '#050507' : '#f8fafc' }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
            i === currentIndex ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: i === currentIndex ? 'scale(1.15) rotate(0.01deg)' : 'scale(1) rotate(0deg)',
            filter: theme === 'dark' ? 'brightness(0.6) contrast(1.1)' : 'brightness(1.1) contrast(0.9)'
          }}
        />
      ))}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          theme === 'dark' ? 'bg-black/50' : 'bg-white/40'
        } ${
          isCinematic ? 'backdrop-blur-xl scale-110' : 'backdrop-blur-sm'
        }`} 
      />
      <div className="dust-particles absolute inset-0 pointer-events-none opacity-10" />
    </div>
  );
};

/**
 * MAGNETIC BUTTON
 */
export const MagneticButton = ({ 
  children, 
  onClick, 
  theme, 
  variant = "primary",
  className,
  disabled,
  ...props 
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const move = (e) => {
    if (disabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({ 
      x: (e.clientX - (left + width / 2)) * 0.3, 
      y: (e.clientY - (top + height / 2)) * 0.3 
    });
  };
  
  const leave = () => setPos({ x: 0, y: 0 });

  const baseStyles = variant === "primary" 
    ? (theme === 'dark' 
        ? 'bg-white text-black hover:bg-indigo-50' 
        : 'bg-black text-white hover:bg-slate-800')
    : (theme === 'dark' 
        ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' 
        : 'bg-black/5 text-black border-black/10 hover:bg-black/10');

  return (
    <div 
      className={cn("relative group inline-block", className)} 
      onMouseMove={move} 
      onMouseLeave={leave}
    >
      <button 
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        className={cn(
          `relative z-10 flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-2xl active:scale-95 border`,
          baseStyles,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        {...props}
      >
        {children}
      </button>
      {!disabled && (
        <div 
          className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-indigo-500 rounded-full pointer-events-none"
          style={{ transform: `translate3d(${pos.x * 1.5}px, ${pos.y * 1.5}px, 0)` }}
        />
      )}
    </div>
  );
};

/**
 * 3D CARD
 */
export const ThreeDCard = ({ title, description, icon: Icon, theme, children, className }) => {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRot({ 
      x: (e.clientY - r.top - r.height/2) / -10, 
      y: (e.clientX - r.left - r.width/2) / 10 
    });
  };
  
  const leave = () => setRot({ x: 0, y: 0 });

  return (
    <div 
      className={cn("perspective-1000 w-full max-w-sm", className)} 
      onMouseMove={move} 
      onMouseLeave={leave}
    >
      <div 
        className={cn(
          `relative p-10 rounded-[2.5rem] border backdrop-blur-2xl transition-transform duration-300 ease-out group`,
          theme === 'dark' 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/40 border-black/5'
        )}
        style={{ 
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, 
          transformStyle: 'preserve-3d' 
        }}
      >
        <div style={{ transform: 'translateZ(70px)' }} className="flex flex-col items-center text-center">
          {Icon && (
            <div className="p-6 bg-indigo-600 rounded-3xl mb-6 shadow-2xl group-hover:scale-110 transition-transform">
              <Icon className="text-white" size={40} />
            </div>
          )}
          {title && <h3 className="text-2xl font-black mb-3">{title}</h3>}
          {description && <p className="opacity-60 leading-relaxed">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

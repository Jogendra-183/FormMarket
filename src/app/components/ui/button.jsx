import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";
import { useTheme } from "../../contexts/ThemeContext";
import { useState, useRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold tracking-[0.01em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-2xl active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:translate-y-[-1px] hover:shadow-[0_16px_36px_-18px_rgba(99,102,241,0.75)]",
        magnetic: "relative group",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border border-border bg-white/70 text-foreground backdrop-blur hover:bg-white hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[#ebe4d4]",
        ghost: "hover:bg-foreground/5 hover:text-foreground shadow-none",
        link: "text-primary underline-offset-4 hover:underline shadow-none"
      },
      size: {
        default: "h-10 px-6 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 rounded-2xl px-8 py-4 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  magnetic = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const move = (e) => {
    if (props.disabled || !ref.current || !magnetic) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({ 
      x: (e.clientX - (left + width / 2)) * 0.3, 
      y: (e.clientY - (top + height / 2)) * 0.3 
    });
  };
  
  const leave = () => setPos({ x: 0, y: 0 });

  const magneticStyles = magnetic && !props.disabled ? {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
  } : {};

  if (magnetic) {
    return (
      <div 
        className="relative group inline-block" 
        onMouseMove={move} 
        onMouseLeave={leave}
      >
        <Comp
          ref={ref}
          data-slot="button"
          style={magneticStyles}
          className={cn(buttonVariants({ variant, size }), "relative z-10", className)}
          {...props}
        />
        {!props.disabled && (
          <div 
            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-indigo-500 rounded-full pointer-events-none"
            style={{ transform: `translate3d(${pos.x * 1.5}px, ${pos.y * 1.5}px, 0)` }}
          />
        )}
      </div>
    );
  }

  return <Comp
    data-slot="button"
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />;
}

export {
  Button,
  buttonVariants
};

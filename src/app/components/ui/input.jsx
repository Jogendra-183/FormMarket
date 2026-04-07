import { cn } from "./utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-10 w-full min-w-0 rounded-xl border px-4 py-2 text-base",
        // Background & border
        "bg-white/70 dark:bg-input/30 border-input shadow-sm",
        // Typography
        "placeholder:text-muted-foreground file:text-foreground",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Selection
        "selection:bg-primary selection:text-primary-foreground",
        // Transitions
        "transition-all duration-200 outline-none",
        // Focus states
        "focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 focus-visible:ring-[3px]",
        "focus-visible:bg-white dark:focus-visible:bg-input/50",
        // Hover state
        "hover:border-indigo-300 hover:shadow-md",
        // Error states
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Responsive
        "md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };

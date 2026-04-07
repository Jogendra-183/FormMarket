"use client";
import { Toaster as Sonner } from "sonner";
import { useTheme } from "../../contexts/ThemeContext";

const Toaster = ({ ...props }) => {
  const { theme = "light" } = useTheme();
  
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="bottom-right"
      expand={true}
      richColors
      closeButton
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      toastOptions={{
        style: {
          borderRadius: '1rem',
          padding: '1rem',
        },
        className: 'shadow-xl backdrop-blur-xl',
      }}
      {...props}
    />
  );
};

export { Toaster };

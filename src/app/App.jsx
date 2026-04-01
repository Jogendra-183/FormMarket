import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/sonner";
import { Chat } from "./components/Chat";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Suspense
            fallback={
              <div className="min-h-screen bg-background text-foreground grid place-items-center">
                <div className="rounded-2xl border border-black/5 bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.2em] shadow-sm">
                  Loading...
                </div>
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
          <Chat />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

var App_default = App;
export { App_default as default };

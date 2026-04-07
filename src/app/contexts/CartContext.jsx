import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cartApi } from "../utils/api";

const CartContext = createContext(void 0);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Check if user is logged in
  const getUser = () => {
    try {
      const stored = localStorage.getItem('farmMarketUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // Load cart from localStorage or backend
  useEffect(() => {
    const loadCart = async () => {
      const stored = localStorage.getItem("farmMarketCart");
      if (stored) {
        setItems(JSON.parse(stored));
      }

      // Try to sync with backend if logged in
      const user = getUser();
      if (user?.token && user?.role === 'buyer') {
        try {
          setIsLoading(true);
          const backendCart = await cartApi.getCart();
          if (backendCart && Array.isArray(backendCart.items)) {
            const mappedItems = backendCart.items.map(item => ({
              id: item.id?.toString() || Math.random().toString(),
              productId: item.productId || item.product?.id,
              name: item.productName || item.product?.name || 'Product',
              price: item.price || item.product?.price || 0,
              image: item.imageUrl || item.product?.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
              farmerId: item.farmerId || item.product?.farmerId,
              farmerName: item.farmerName || item.product?.farmerName || 'Unknown Farmer',
              quantity: item.quantity || 1
            }));
            setItems(mappedItems);
            localStorage.setItem("farmMarketCart", JSON.stringify(mappedItems));
            setIsSynced(true);
          }
        } catch (error) {
          console.log("Backend cart sync failed, using local:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadCart();
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("farmMarketCart", JSON.stringify(items));
  }, [items]);

  // Sync with backend (debounced)
  const syncWithBackend = useCallback(async (productId, quantity, action) => {
    const user = getUser();
    if (!user?.token || user?.role !== 'buyer') return;

    try {
      if (action === 'add') {
        await cartApi.addItem(productId, quantity);
      } else if (action === 'update') {
        await cartApi.updateItem(productId, quantity);
      } else if (action === 'remove') {
        await cartApi.removeItem(productId);
      }
      setIsSynced(true);
    } catch (error) {
      console.log("Cart sync failed:", error.message);
      setIsSynced(false);
    }
  }, []);

  const addToCart = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        syncWithBackend(item.productId, existing.quantity + 1, 'update');
        return prev.map(
          (i) => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      syncWithBackend(item.productId, 1, 'add');
      return [...prev, { ...item, quantity: 1 }];
    });
  }, [syncWithBackend]);

  const removeFromCart = useCallback((productId) => {
    syncWithBackend(productId, 0, 'remove');
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, [syncWithBackend]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    syncWithBackend(productId, quantity, 'update');
    setItems(
      (prev) => prev.map((i) => i.productId === productId ? { ...i, quantity } : i)
    );
  }, [removeFromCart, syncWithBackend]);

  const clearCart = useCallback(async () => {
    const user = getUser();
    if (user?.token && user?.role === 'buyer') {
      try {
        await cartApi.clearCart();
      } catch (error) {
        console.log("Clear cart backend failed:", error.message);
      }
    }
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        total,
        itemCount,
        isLoading,
        isSynced
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export {
  CartProvider,
  useCart
};

import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext(void 0);
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("farmMarketCart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("farmMarketCart", JSON.stringify(items));
  }, [items]);
  const addToCart = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map(
          (i) => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(
      (prev) => prev.map((i) => i.productId === productId ? { ...i, quantity } : i)
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <CartContext.Provider
    value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
  >{children}</CartContext.Provider>;
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

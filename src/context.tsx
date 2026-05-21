import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Order, Product, User } from './types';

interface StoreState {
  currentUser: User | null;
  cart: CartItem[];
  orders: Order[];
  login: (email: string, name: string) => void;
  logout: () => void;
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lumina_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [userCarts, setUserCarts] = useState<Record<string, CartItem[]>>(() => {
    const saved = localStorage.getItem('lumina_carts');
    return saved ? JSON.parse(saved) : {};
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lumina_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lumina_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lumina_carts', JSON.stringify(userCarts));
  }, [userCarts]);

  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  const cart = currentUser ? (userCarts[currentUser.email] || []) : [];

  const login = (email: string, name: string) => {
    const isAdmin = email.toLowerCase() === 'admin@lumina.com';
    setCurrentUser({ email, name, isAdmin });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addToCart = (product: Product, size: string, color: string) => {
    if (!currentUser) return;
    
    setUserCarts((prev) => {
      const currentCart = prev[currentUser.email] || [];
      const cartItemId = `${product.id}-${size}-${color}`;
      const existingItem = currentCart.find((item) => item.cartItemId === cartItemId);
      
      let newCart;
      if (existingItem) {
        newCart = currentCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...currentCart, { cartItemId, product, size, color, quantity: 1 }];
      }
      return { ...prev, [currentUser.email]: newCart };
    });
  };

  const removeFromCart = (cartItemId: string) => {
    if (!currentUser) return;
    setUserCarts((prev) => {
      const currentCart = prev[currentUser.email] || [];
      return { ...prev, [currentUser.email]: currentCart.filter((item) => item.cartItemId !== cartItemId) };
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
     if (!currentUser) return;
     if (quantity <= 0) {
       removeFromCart(cartItemId);
       return;
     }
     setUserCarts((prev) => {
       const currentCart = prev[currentUser.email] || [];
       const newCart = currentCart.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item));
       return { ...prev, [currentUser.email]: newCart };
     });
  };

  const clearCart = () => {
    if (!currentUser) return;
    setUserCarts((prev) => ({ ...prev, [currentUser.email]: [] }));
  };
  
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{ currentUser, cart, orders, login, logout, addToCart, removeFromCart, updateQuantity, clearCart, addOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

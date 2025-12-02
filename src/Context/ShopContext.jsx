import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // pomocnicza funkcja do zainicjowania koszyka na podstawie listy produktów
  const initCartFromProducts = (productsArray) => {
    const cart = {};
    productsArray.forEach((p) => {
      // zakładamy, że każdy produkt ma unikalne pole "id"
      cart[p.id] = 0;
    });
    return cart;
  };

  // pobieranie produktów z backendu Flask
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setCartItems(initCartFromProducts(data));
      })
      .catch((err) => {
        console.error("Błąd pobierania produktów z backendu:", err);
      });
  }, []);

  // obliczanie całkowitej kwoty w koszyku
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += cartItems[itemId] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  // liczba wszystkich sztuk produktów w koszyku
  const getActuallItemAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalAmount += cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFormCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) - 1,
    }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: newAmount,
    }));
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFormCart,
    updateCartItemCount,
    getTotalCartAmount,
    getActuallItemAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

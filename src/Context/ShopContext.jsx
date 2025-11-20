import React, { createContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../Products';

export const ShopContext = createContext(null);

// Klucz cache + czas życia w ms
const PRODUCTS_CACHE_KEY = "products_cache";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 godziny

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState(PRODUCTS);
    const [cartItems, setCartItems] = useState({});

    // Inicjalizacja koszyka
    useEffect(() => {
        const cart = {};
        for (let i = 1; i < products.length + 1; i++) {
            cart[i] = 0;
        }
        setCartItems(cart);
    }, [products]);

    // ----  CACHE PRODUKTÓW (OPTIMALIZACJA) ----
    useEffect(() => {
        const now = Date.now();
        const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);

        if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.expiresAt > now) {
                // używamy danych z cache
                setProducts(parsed.data);
                return;
            }
        }

        // Brak cache albo cache wygasł → zapisujemy produkty
        localStorage.setItem(
            PRODUCTS_CACHE_KEY,
            JSON.stringify({
                data: PRODUCTS,
                expiresAt: now + CACHE_TTL,
            })
        );
    }, []);
    // ---- KONIEC CACHE PRODUKTÓW ----

    // Funkcje sklepu (bez zmian)
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0) {
                let itemInfo = products.find((p) => p.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    };

    const getActuallItemAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0) {
                totalAmount += cartItems[item];
            }
        }
        return totalAmount;
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId]+1}));
    };

    const removeFormCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId]-1}));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : newAmount}));
    };

    const contextValue = {
        products,
        cartItems,
        addToCart,
        removeFormCart,
        updateCartItemCount,
        getTotalCartAmount,
        getActuallItemAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

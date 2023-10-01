// React
import { createContext, useEffect, useState } from 'react'

// Types
import { MProduct } from '../models/MProduct';
import { ICartContext, MCart } from '../models/ICartContext';
import { IContextProviderProps } from '../models/IContextProviderProps';

export const CartContext = createContext<ICartContext>({
    cart: [{ product: {
        id: 0,
        name: "",
        active: false,
        price: 0,
        cookingTime: 0,
        image: "",
        subcategory: { id: 0, name: "", parentCategory: null},
        cost: 0,
        ingredients: [{ id: 0, ingredient: { id: 0, name: "", cost: 0, stock: 0, stockMin: 0, measure: { id: 0, measure: ""}}, cant: 0}],
    }, quantity: 0 }],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    setCart: () => {},
  });

export function CartProvider({ children } : IContextProviderProps) {
    const [cart, setCart] = useState<MCart[]>(() => {
        const storedCart = window.localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [{}];
    });

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: MProduct, addQty: boolean = true, qty: number = 1) => {  
        if(cart[0].quantity === 0) setCart([]);

        const productInCartIndex: number = cart.findIndex((item : MCart) => item.product.id === product.id)

        if(productInCartIndex >= 0 && addQty) {
            const newCart: MCart[] = structuredClone(cart);
            newCart[productInCartIndex].quantity += qty;
            console.log(newCart);
            return setCart(newCart)
        }
        else if(productInCartIndex >= 0 && !addQty) {
            const newCart: MCart[] = structuredClone(cart);
            newCart[productInCartIndex].quantity -= qty
            console.log(newCart);
            if(newCart[productInCartIndex].quantity == 0) return removeFromCart(newCart[productInCartIndex].product);
            else return setCart(newCart);
        }

        setCart((prevState) => ([
            ...prevState,
            {
                product: { ...product },
                quantity: qty
            }
        ]))

    }

    const removeFromCart = (p: MProduct) => {
        if(cart.length >= 2) setCart(prevState => prevState.filter((item : MCart) => item.product.id !== p.id));
        else clearCart();
        
    }

    const clearCart = () => {
        setCart([{ product: {
            id: 0,
            name: "",
            active: false,
            price: 0,
            cookingTime: 0,
            image: "",
            subcategory: { id: 0, name: "", parentCategory: null},
            cost: 0,
            ingredients: [{ id: 0, ingredient: { id: 0, name: "", cost: 0, stock: 0, stockMin: 0, measure: { id: 0, measure: ""}}, cant: 0}],
        }, quantity: 0}]);
    }

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
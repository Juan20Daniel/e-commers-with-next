import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
    cart: CartProduct[];

    addProducttoCart: (product:CartProduct) => void;    
}

export const useCartStore = create<InitialState>()(
    persist(
        (set, get) => ({
            cart:[],

            addProducttoCart:(productToAdd:CartProduct) => {
                const cart = get().cart;
                const existProductInCart = cart.some(product => {
                    return (product.id === productToAdd.id && product.size === productToAdd.size)
                })
                if(!existProductInCart) {
                    return set({cart:[...cart, productToAdd]});
                }
                const updateCartProducts = cart.map(product => {
                    return (product.id === productToAdd.id && product.size === productToAdd.size)
                        ? {...product, quantity:product.quantity+productToAdd.quantity} 
                        : product;
                });
                set({cart:updateCartProducts});
            }
        }),
        {
            name:'teslo-shop'
        }
    )
)
import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
    cart: CartProduct[];

    getTotalProductsInCart: () => number;
    addProducttoCart: (product:CartProduct) => void;
    removeProduct: (product:CartProduct) => void;  
}

export const useCartStore = create<InitialState>()(
    persist(
        (set, get) => ({
            cart:[],

            getTotalProductsInCart: () => {
                const cart = get().cart;
                const totalProductsInCart = cart.reduce((counter, currentProduct) => {
                    return counter+currentProduct.quantity;
                },0); 
                return totalProductsInCart;
            },
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
            },
            removeProduct: (product:CartProduct) => {
                const cart = get().cart;

                const result = cart.filter(productInCart => {
                    return (productInCart.id !== product.id && productInCart.size !== product.size)
                });
                set({cart:result});
            }
        }),
        {
            name:'teslo-shop'
        }
    )
)
import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import createDeepMerge from '@fastify/deepmerge'

const deepMerge = createDeepMerge({ all: true })

interface InitialState {
    cart: CartProduct[] | null;

    getTotalProductsInCart: () => number;
    addProducttoCart: (product:CartProduct) => void;
    removeProduct: (product:CartProduct) => void;
    updateProductQuantity: (product:CartProduct, quantity:number, isIncreasing:boolean) => void;
    getSubTotal: () => number;
    getTaxis: () => number;
    getTotal:() => number;
}

export const useCartStore = create<InitialState>()(
    persist(
        (set, get) => ({
            cart:null,

            getTotalProductsInCart: () => {
                const cart = get().cart;
                if(!cart) return 0;
                const totalProductsInCart = cart!.reduce((counter, currentProduct) => {
                    return counter+currentProduct.quantity;
                },0);
                return totalProductsInCart;
            },
            addProducttoCart:(productToAdd:CartProduct) => {
                const cart = get().cart;
                const existProductInCart = cart!.some(product => {
                    return (product.id === productToAdd.id && product.size === productToAdd.size)
                })
                if(!existProductInCart) {
                    return set({cart:[...cart!, productToAdd]});
                }
                const updateCartProducts = cart!.map(product => {
                    return (product.id === productToAdd.id && product.size === productToAdd.size)
                        ? {...product, quantity:product.quantity+productToAdd.quantity}
                        : product;
                });
                set({cart:updateCartProducts});
            },
            removeProduct: (product:CartProduct) => {
                const cart = get().cart;
                console.log(product)
                const result = cart!.filter(productInCart => {
                    return (productInCart.id !== product.id || productInCart.size !== product.size) && productInCart
                });
                set({cart:result});
            },
            updateProductQuantity: (product:CartProduct, quantity:number) => {
                const cart = get().cart;

                const updateQuantity = cart!.map(productInCart => {
                    if(productInCart.id === product.id && productInCart.size === product.size) {
                        return {
                            ...productInCart,
                            quantity: quantity
                        }
                    }
                    return productInCart;
                });
                set({cart:updateQuantity});
            },
            getSubTotal: () => {
                const cart = get().cart;
                if(!cart) return 0;
                const calcSubTotal = cart.reduce((subTotal, currentValue) => {
                    const totalByProduct = currentValue.price*currentValue.quantity;
                    return subTotal+totalByProduct;
                },0);
                
                return calcSubTotal;
            },
            getTaxis: () => {
                const {getSubTotal} = get();
                return  getSubTotal()*0.15;
            },
            getTotal:() => {
                const {getSubTotal, getTaxis} = get();
                return getSubTotal()+getTaxis();
            }
        }),
        {
            name:'teslo-shop-cart',
            merge: (persisted, current) => {
                if(!persisted) {
                    return deepMerge(current, {cart:[]}) as never;
                }
                return deepMerge(current, persisted) as never;
            }
        }
    )
)
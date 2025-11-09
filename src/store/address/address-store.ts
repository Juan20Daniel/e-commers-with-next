
import { Address } from "@/interfaces/address-interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
    address: Address;
    rememberAddress: boolean;
    saveAdderessLS:(form:Address) => void;
    toggleRememberAddress: (rememberAddress:boolean) => void;
}

export const useAddressStorage = create<InitialState>()(
    persist(
        (set, get) => ({
            address: {
                firstname:'',   
                lastname: '',
                address: '',
                opAddress:'',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
            },
            rememberAddress: false,
            saveAdderessLS:(form:Address) => {
                set({address: form})
            },
            toggleRememberAddress:(rememberAddress:boolean) => {
                set({rememberAddress:rememberAddress});
            }
        }),
        {
            name:"teslo-shop-address"
        }
    )
);
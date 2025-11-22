import { Address } from "@/interfaces/address.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface InitialState {
    address: Address;
    saveAdderessLS:(form:Address) => void;
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
            saveAdderessLS:(form:Address) => {
                set({address: form})
            },
        }),
        {
            name:'teslo-shop-address'
        }
    )
);
import { Address } from "@/interfaces/address-interface";
import { create } from "zustand";
interface InitialState {
    address: Address;
    saveAdderessLS:(form:Address) => void;
}

export const useAddressStorage = create<InitialState>()(
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
);
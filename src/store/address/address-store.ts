import { FormStateValues } from "@/interfaces/form-state.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
    address: FormStateValues,
    saveAdderess:(form:FormStateValues) => void;
}

export const useAddressStorage = create<InitialState>()(
    persist(
        (set, get) => ({
            address: {
                fullname:'',   
                lastname: '',
                address: '',
                opAddress:'',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
            },
            saveAdderess:(form:FormStateValues) => {
                set({address: form})
            }
        }),
        {
            name:"teslo-shop-address"
        }
    )
);
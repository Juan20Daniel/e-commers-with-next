import { create } from "zustand";

interface InitialState {
    redirectPath:string | null;

    getRedirectPath: (path:string) => void;
}

export const useRedirectPath = create<InitialState>()((set) => ({
    redirectPath:null,
    getRedirectPath: (path:string) => {
        set({redirectPath:path});
    }
}));
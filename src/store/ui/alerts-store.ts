import { create } from 'zustand';

interface AlertData {
    visible?: boolean;
    type: 'message' | 'error' | null
    title: string;
    message: string;
    subMessage?: string;
}

interface InitialState extends AlertData {
    open: (params:AlertData) => void;
    close: () => void;
}

export const useAlertsStore = create<InitialState>()((set) => ({
    visible: false,
    type: null,
    title: '',
    message: '',
    subMessage: '',
    open: ({type, title, message, subMessage}:AlertData) => {
        set({
            visible: true,
            type: type,
            title: title,
            message: message,
            subMessage: subMessage??''
        });
    },
    close: () => {
        set({
            visible: false,
            type: null,
            title: '',
            message: '',
            subMessage: ''
        });
    }
}));
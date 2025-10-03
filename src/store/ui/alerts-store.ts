import { create } from 'zustand';

interface AlertData {
    visible?: boolean;
    type: 'message' | 'error' | 'confirm' | null
    title: string;
    message: string;
    subMessage?: string;
    confirmAction?:() => void;
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
    confirmAction: undefined,

    open: ({type, title, message, subMessage, confirmAction=undefined}:AlertData) => {
        set({
            visible: true,
            type: type,
            title: title,
            message: message,
            subMessage: subMessage??'',
            confirmAction
        });
    },
    close: () => {
        set({
            visible: false,
            type: null,
            title: '',
            message: '',
            subMessage: '',
            confirmAction: undefined,
        });
    }
}));
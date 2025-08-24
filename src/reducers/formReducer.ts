import { FormState } from "@/interfaces/form-state.interface";
import { FormActionTypes } from "./actionTypes";
const expretions:Record<string, RegExp> = {
    fullname: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    lastname: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    address: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    opAddress: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    postalCode: /^[0-9]{5}$/,
    city: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{5,20}$/,
    country: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{5,20}$/,
    phone: /^[0-9]{10}$/
}

export const initialState:FormState = {
    values: {
        fullname: '',
        lastname: '',
        address: '',
        opAddress: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
    },
    errors: {
        fullname: null,   
        lastname: null,
        address: null,
        opAddress: null,
        postalCode: null,
        city: null,
        country: null,
        phone: null
    }
}

export const formReducer = (state:FormState, action:FormActionTypes) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                values:{
                    ...state.values,
                    [action.field]:action.value
                }
            }
        case "VALIDATE_INPUTS": 
            const errors = { ...state.errors };

            (Object.keys(state.values) as (keyof typeof state.values)[]).forEach(key => {
                if(state.values[key] === '') {
                    errors[key] = 'empty'
                } else {
                    const fieldValue = state.values[key]??''
                    const ckeckValue = expretions[key].test(fieldValue.toString());
                    errors![key] = ckeckValue ? 'valid' : 'invalid'
                }
            });
            return {...state, errors};
        case "RESET":
            return initialState;
        default:
            return state;
    }
}
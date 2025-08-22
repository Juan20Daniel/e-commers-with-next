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
        postalCode: null,
        city: '',
        country: '',
        phone: null
    },
    errors: {
        fullname: '',
        lastname: '',
        address: '',
        opAddress: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
    }
}

const validValues = (value:string|number, field:string|number) => {
    
    console.log(expretions[field].test(String(value)));
    
}

export const formReducer = (state:FormState, action:FormActionTypes) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            const {values} = state;
            validValues(action.value, action.field);
            return {
                ...values,
                values: {
                    ...values,
                    [action.field]:action.value
                }
            }
        case "RESET":
            return initialState;
        default:
            return state;
    }
}
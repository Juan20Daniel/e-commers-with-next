import { FormState, InputError } from "@/interfaces/form-state.interface";
import { FormActionTypes } from "./actionTypes";
const expretions:Record<string, RegExp> = {
    firstname: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    lastname: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    address: /^[a-zA-Z\.,ñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    opAddress: /^[a-zA-Z\.,ñÑáÁéÉíÍóÓúÚ ]{3,30}$/,
    postalCode: /^[0-9]{5}$/,
    city: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{5,20}$/,
    country: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]{5,20}$/,
    phone: /^[0-9]{10}$/
}

export const initialState:FormState = {
    values: {
        firstname: '',
        lastname: '',
        address: '',
        opAddress: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
    },
    errors: {
        firstname: {status:null, valid:false},   
        lastname: {status:null, valid:false},
        address: {status:null, valid:false},
        opAddress: {status:null, valid:false},
        postalCode: {status:null, valid:false},
        city: {status:null, valid:false},
        country: {status:null, valid:false},
        phone: {status:null, valid:false}
    }
}

const validInputs = ():Record<string, InputError> => {
    const inputs:Record<string, InputError> = {}
    for(let input in initialState.errors) {
        inputs[input] = {status:null, valid:true}
    }
    return inputs;
}

export const formReducer = (state:FormState, action:FormActionTypes) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                values:{
                    ...state.values,
                    [action.field]:action.value
                },
                errors: {
                    ...state.errors,
                    [action.field]:{...state.errors[action.field], valid:expretions[action.field].test(String(action.value)) }
                }
            }
        case "VALIDATE_INPUTS": 
            const errors = { ...state.errors };

            (Object.keys(state.values) as (keyof typeof state.values)[]).forEach(key => {
                if(state.values[key] === '') {
                    errors[key] = {...errors[key], status:'empty'}
                } else {
                    const fieldValue = state.values[key]??''
                    const ckeckValue = expretions[key].test(fieldValue.toString());
                    errors![key] = {...errors[key], status:ckeckValue ? 'valid' : 'invalid'}
                }
            });
            return {...state, errors};
        case "CLEAR_INPUT":
            return {
                values: {
                    ...state.values,
                    [action.field]:''
                },
                errors: {
                    ...state.errors,
                    [action.field]:{...state.errors[action.field], valid:false}
                }
            }
        case "RESET":
            return {
                values: action.form,
                errors: validInputs()
            }
        default:
            return state;
    }
}
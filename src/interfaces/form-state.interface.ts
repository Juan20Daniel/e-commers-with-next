import { Address } from "./address.interface";

export interface FormState {
    values: Address,
    errors: Record<string, InputError>;
}


export interface InputError {
    status:InputStatusError;
    valid:boolean;
}
export type InputStatusError = null|'empty'|'valid'|'invalid';
   

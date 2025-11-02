export interface FormState {
    values: FormStateValues,
    errors: Record<string, InputError>;
}

export interface FormStateValues {
    fullname: string;   
    lastname: string;
    address: string;
    opAddress: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
}
interface InputError {
    status:InputStatusError;
    valid:boolean;
}
export type InputStatusError = null|'empty'|'valid'|'invalid';
   

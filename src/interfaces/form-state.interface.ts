export interface FormState {
    values: {
        fullname: string;   
        lastname: string;
        address: string;
        opAddress: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    },
    errors: Record<string, InputError>;
}
interface InputError {
    status:InputStatusError;
    valid:boolean;
}
export type InputStatusError = null|'empty'|'valid'|'invalid';
   

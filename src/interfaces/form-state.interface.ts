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
    errors: {
        fullname: InputError;   
        lastname: InputError;
        address: InputError;
        opAddress: InputError;
        postalCode: InputError;
        city: InputError;
        country: InputError;
        phone: InputError;
    }
}
export type InputError = null|'empty'|'valid'|'invalid';
   

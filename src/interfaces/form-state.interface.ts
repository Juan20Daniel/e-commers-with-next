export interface FormState {
    values: {
        fullname: string;   
        lastname: string;
        address: string;
        opAddress?: string;
        postalCode: number|null;
        city: string;
        country: string;
        phone: number|null;
    },
    errors?: {
        fullname?: string;   
        lastname?: string;
        address?: string;
        opAddress?: string;
        postalCode?: string;
        city?: string;
        country?: string;
        phone?: string;
    }
}

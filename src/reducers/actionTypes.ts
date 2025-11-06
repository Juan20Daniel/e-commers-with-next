import { Address } from "@/interfaces/address-interface";


export type FormActionTypes =
    |   {type:'CHANGE_INPUT'; field:string; value:string}
    |   {type:'VALIDATE_INPUTS' }
    |   {type:'RESET', form:Address}
    |   {type:'CLEAR_INPUT'; field:string}
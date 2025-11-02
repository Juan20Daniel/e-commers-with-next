import { FormStateValues } from "@/interfaces/form-state.interface";

export type FormActionTypes =
    |   {type:'CHANGE_INPUT'; field:string; value:string}
    |   {type:'VALIDATE_INPUTS' }
    |   {type:'RESET', form:FormStateValues}
    |   {type:'CLEAR_INPUT'; field:string}
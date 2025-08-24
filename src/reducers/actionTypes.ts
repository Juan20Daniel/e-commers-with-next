export type FormActionTypes =
    |   {type:'CHANGE_INPUT'; field:string; value:string|number}
    |   {type:'VALIDATE_INPUTS' }
    |   {type:'RESET'}
export type FormActionTypes =
    |   {type:'CHANGE_INPUT'; field:string; value:string}
    |   {type:'VALIDATE_INPUTS' }
    |   {type:'RESET'}
    |   {type:'CLEAR_INPUT'; field:string}
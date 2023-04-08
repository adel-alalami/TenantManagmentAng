export interface UserRegistrationDTO{
    email : string;
    password : string;
    confirmPassword : string;
}
export interface RegistrationResponseDTO{
    isSuccessful : boolean;
    errors : string[];
}
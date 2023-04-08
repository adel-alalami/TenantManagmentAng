export interface LoginRequest{
    email : string;
    password: string;
}

export interface LoginResponse{
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}
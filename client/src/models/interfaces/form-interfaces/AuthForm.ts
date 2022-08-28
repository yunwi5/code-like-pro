export interface IAuthFormState {
    email: string;
    password: string;
    name?: string;
}

export interface IRegisterState extends IAuthFormState {
    name: string;
}

export interface IAuthErrorState {
    email: string;
    name?: string;
    password: string;
    overall: string;
}

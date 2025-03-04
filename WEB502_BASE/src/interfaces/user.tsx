export interface register {
    username: string,
    email: string,
    password: string,
    confirmPassword: string | undefined
}
export interface login {
    email: string,
    password: string,
}
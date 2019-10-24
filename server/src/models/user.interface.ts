export interface User {
    id_user?: number | string,
    email: string,
    password?: string,
    name: string,
    surname: string,
    id_user_type: number | string
}
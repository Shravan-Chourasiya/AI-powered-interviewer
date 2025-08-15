import { z } from 'zod'
export const usernameValidation = z
    .string()
    .min(4, 'username must be atleast 4 Characters !')
    .max(25, 'Username must not exceed 25 Characters !')

export const passwordValidation = z
    .string()
    .min(8, 'password must be atleast 8 Characters !')

export const emailValidation = z.email()
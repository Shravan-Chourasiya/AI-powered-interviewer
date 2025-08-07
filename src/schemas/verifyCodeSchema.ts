import {z} from 'zod'
export const verifyCode=z
        .string()
        .min(6,'Verification code must be atleast 6 Characters !')

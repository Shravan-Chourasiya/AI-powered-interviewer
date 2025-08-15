import { z } from 'zod'
export const signUpSchema = z.object({
    username: z
        .string()
        .min(4, 'username must be atleast 4 Characters !')
        .max(25, 'Username must not exceed 25 Characters !'),
        //.regex(/^A-Za-z0-9_-@/, { message: "Username must not contain special characters except @,_ & -" }),
    password: z.string().min(8, 'password must be atleast 8 Characters !'),
    email: z.email()
})

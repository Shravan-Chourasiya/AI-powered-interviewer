import { z } from 'zod'
import { emailValidation } from '@/schemas/validationSchema'
import dbConn from '@/lib/db'
import UserModel from '@/models/User.model'
import retRes from '@/utilities/returnResponse'
const emailQuerySchema = z.object({
    email: emailValidation
})
export async function POST(request: Request) {
    await dbConn()
    try {
        const { password, email, newemail } = await request.json()
        const parsedOldEmail = emailQuerySchema.safeParse(email)
        const user = await UserModel.findOne({
            password, isVerified: true, email: parsedOldEmail
        })
        if (!user) {

            return retRes(false, 'User Not Found ! ', 404)
        }
        user.email = newemail
        await user.save()
        return retRes(true, 'email Updated Successfully !!', 200)
        //send a mail notifying user bout email updation with the username and the newpaswrod in it

    } catch (error) {
        console.error('Error changing email:', error)
        return retRes(false, 'Error Changing email!!', 500)
    }
}
import { z } from 'zod'
import { passwordValidation } from '@/schemas/validationSchema'
import dbConn from '@/lib/db'
import UserModel from '@/models/User.model'
import retRes from '@/utilities/returnResponse'
const passwordQuerySchema = z.object({
    password: passwordValidation
})
export async function POST(request: Request) {
    await dbConn()
    try {
        const { username, oldpassword, newpassword } = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const parsedOldPass = passwordQuerySchema.safeParse(oldpassword)
        const user = await UserModel.findOne({
            username: decodedUsername, isVerified: true, password: parsedOldPass
        })
        if (!user) {

            return retRes(false, 'User Not Found ! ', 404)
        }
        user.password=newpassword
        await user.save()
        return retRes(true,'Password Updated Successfully !!',200)
        //send a mail notifying user bout password updation with the username and the newpaswrod in it

    } catch (error) {
        console.error('Error changing password:', error)
        return retRes(false, 'Error Changing Password!!', 500)
    }
}
import { z } from 'zod'
import { passwordValidation, usernameValidation } from '@/schemas/validationSchema'
import dbConn from '@/lib/db'
import UserModel from '@/models/User.model'
import retRes from '@/utilities/returnResponse'
const usernameQuerySchema = z.object({
    username: usernameValidation
})
const passwordQuerySchema = z.object({
    password: passwordValidation
})
export async function POST(request: Request) {
    await dbConn()
    try {
        const { username, newusername, password } = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const parsedUsername = usernameQuerySchema.safeParse(newusername)
        const parsedPassword = passwordQuerySchema.safeParse(password)
        const user = await UserModel.findOne({
            username: decodedUsername, isVerified: true, password: parsedPassword
        })
        if (!user) {

            return retRes(false, 'User Not Found ! ', 404)
        }
        if (!parsedUsername.success) {
            return retRes(false, 'Invalid new username!', 400)
        }
        user.username = username
        await user.save()
        return retRes(true, 'username Updated Successfully !!', 200)
        //send a mail notifying user bout username updation with the username and the newpaswrod in it

    } catch (error) {
        console.error('Error changing username:', error)
        return retRes(false, 'Error Changing username!!', 500)
    }
}
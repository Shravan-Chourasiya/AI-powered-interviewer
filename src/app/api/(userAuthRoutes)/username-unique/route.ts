import { z } from 'zod'
import { usernameValidation } from '@/schemas/validationSchema'
import dbConn from '@/lib/db'
import UserModel from '@/models/User.model'
import retRes from '@/utilities/returnResponse'

const usernameUniqueQuery = z.object({
    username: usernameValidation
})
export async function GET(request: Request) {
    await dbConn();
    try {
        const { searchParams } = new URL(request.url)
        const username = searchParams.get("username")
        const queryParam = { username }
        const result = usernameUniqueQuery.safeParse(queryParam)
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            console.log();
            return retRes(false, usernameErrors.length > 0 ? usernameErrors.join(' , ') : 'Invalid Username Format | Username Should not contain Special Characters !', 400)
        }
        const { username: validUsername } = result.data
        const user = await UserModel.findOne({ username: validUsername, isVerified: true })
        if (user) {
            return retRes(false, 'Verified User with This Username already Exists! | Use another username', 401)
        }
        
        return retRes(true, "Username Is Available", 200)
    } catch (error) {
        console.log("Error Checking Username availability ! ", error);
        return retRes(false, 'Error Checking Username availability !! ', 500)
    }
}
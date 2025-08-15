import { z } from 'zod'
import { verifyCode } from '@/schemas/verifyCodeSchema'
import dbConn from '@/lib/db'
import UserModel from '@/models/User.model'
import retRes from '@/utilities/returnResponse'

const verifyCodeQuerySchema = z.object({
    verificationCode: verifyCode
})

export async function GET(request: Request) {
    await dbConn()
    const { username, code } = await request.json()
    try {
        const decodedUsername =decodeURIComponent(username)
        const parsedCodeResult = verifyCodeQuerySchema.safeParse({ verificationCode: code })
        const unverifiedUser = await UserModel.findOne({ username: decodedUsername, isVerified: false })
        if (!unverifiedUser) {
            console.log("user not found ! ");
            return retRes(false, 'User Not Found ! ', 404)
        }

        const isVerifyCodeValid = parsedCodeResult.success && unverifiedUser.verifyCode === parsedCodeResult.data.verificationCode
        const isVerifyCodeExpired = new Date(unverifiedUser.verifyCodeExpiry) > new Date()
        if (isVerifyCodeExpired && isVerifyCodeValid) {
            unverifiedUser.isVerified = true
            await unverifiedUser?.save()
            return retRes(true, "User verified Successfully | Please Log In. ", 201)
        } else if (!isVerifyCodeExpired) {
            console.log("Verification Code Expired | Please Sign Up again !");
            return retRes(false, 'Verification Code Expired | Please Sign Up again !', 406)
        } else {
            console.log('Invalid Verificatioin Code | Please Check Your Code !');
            return retRes(false, 'Invalid Verificatioin Code | Please Check Your Code !', 407)
        }
    } catch (error) {
        console.log("error verifiying user! ", error);
        return retRes(false, 'Error Verifying User!!', 500)
    }
}
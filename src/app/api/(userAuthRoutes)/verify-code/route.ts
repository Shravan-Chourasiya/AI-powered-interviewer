import { z } from 'zod'
import dbConn from '@/lib/db'
import UserModel from '@/models/User.model'
import retRes from '@/utilities/returnResponse'

const verifyCodeQuerySchema = z.object({
    verificationCode: z.string() // Direct string validation
})

export async function POST(request: Request) {
    await dbConn()
    
    try {
        const { username, code } = await request.json()
        
        if (!username || !code) {
            return retRes(false, 'Username and code are required', 400)
        }

        const decodedUsername = decodeURIComponent(username)
        const parsedCodeResult = verifyCodeQuerySchema.safeParse({ verificationCode: code })
        
        if (!parsedCodeResult.success) {
            return retRes(false, 'Invalid verification code format', 400)
        }

        const unverifiedUser = await UserModel.findOne({ 
            username: decodedUsername, 
            isVerified: false 
        })
        
        if (!unverifiedUser) {

            return retRes(false, 'User Not Found!', 404)
        }

        const isVerifyCodeValid = unverifiedUser.verifyCode === parsedCodeResult.data.verificationCode
        const isVerifyCodeNotExpired = new Date(unverifiedUser.verifyCodeExpiry) > new Date()
        
        if (isVerifyCodeNotExpired && isVerifyCodeValid) {
            unverifiedUser.isVerified = true
            await unverifiedUser.save()
            return retRes(true, "User verified Successfully | Please Log In.", 200)
        } else if (!isVerifyCodeNotExpired) {

            return retRes(false, 'Verification Code Expired | Please Sign Up again!', 410)
        } else {

            return retRes(false, 'Invalid Verification Code | Please Check Your Code!', 400)
        }
    } catch (error) {
        console.error('Error verifying user:', error)
        return retRes(false, 'Error Verifying User!', 500)
    }
}
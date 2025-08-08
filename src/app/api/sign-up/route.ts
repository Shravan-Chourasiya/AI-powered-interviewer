import dbConn from "@/lib/db";
import UserModel from "@/models/User.model";
import { sendVerificationEmail } from "@/utilities/sendVerificationMail";
import bcrypt from 'bcryptjs'
import retRes from "@/utilities/returnResponse";
export async function POST(request: Request) {
    await dbConn()
    try {
        const { username, email, password } = await request.json()
        const verifiedExistingUserByUsername = await UserModel.findOne({ username, isVerified: true })

        if (verifiedExistingUserByUsername) return retRes(false, 'Verified user exists with this Username ', 400)

        const ExistingUserByEmail = await UserModel.findOne({email})

        if (ExistingUserByEmail) {
            if (ExistingUserByEmail.isVerified) {
                return retRes(false, 'User already exists and is verified!', 400)
            } else {
                const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
                const hasedPass = await bcrypt.hash(password, 15)
                const codeExpiryDate = new Date(Date.now() + 3600000)

                ExistingUserByEmail.password = hasedPass
                ExistingUserByEmail.verifyCode = verifyCode
                ExistingUserByEmail.verifyCodeExpiry = codeExpiryDate
                await ExistingUserByEmail.save()
                return retRes(true, 'User registered Successfully!!', 202)
            }
        } else {
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
            const hasedPass = await bcrypt.hash(password, 15)
            const codeExpiryDate = new Date()
            codeExpiryDate.setHours(codeExpiryDate.getHours() + 1)
            const newUser = new UserModel({
                username,
                password: hasedPass,
                email,
                verifyCode,
                verifyCodeExpiry: codeExpiryDate,
                isActive: true,
                isVerified: false,
                isAdmin: false
            })
            await newUser.save()

            const emailResponse = await sendVerificationEmail(email, username, verifyCode)

            if (!emailResponse.success) return retRes(false, emailResponse.message, 500)
            return retRes(true, 'User registered Successfully | Please verify your Email!!', 201)
        }


    } catch (emailerror) {
        console.error("Error Registering the user ! ", emailerror)
        return retRes(false, 'Error registering the User.Please Try Again Later', 500)
    }

}
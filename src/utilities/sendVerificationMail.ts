import { resend } from "@/lib/resendEmail";
import VerificationEmail from "@/emailTemplates/verificationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Ai Interviewer | Verification Code ',
            react:VerificationEmail({username,verifycode})
        });

        return {
            success: true,
            message: "Verification Email sent successfully !",
            statuscode: 202,
        }
    } catch (emailerror) {
        console.error("Error sending Verification Email ! ", emailerror)
        return {
            success: false,
            message: "Failed to send Verification Email !",
            statuscode: 500,
        }
    }
}
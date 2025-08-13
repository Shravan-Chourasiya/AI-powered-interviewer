import VerificationEmail from "@/emailTemplates/verificationEmail";
import { ApiResponse } from "../types/ApiResponse";
import nodemailer from "nodemailer"
import { render } from '@react-email/components';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string
): Promise<ApiResponse> {
    try {
        // const emailSent = await resend.emails.send({
        //     from: 'onboarding@resend.dev',
        //     to: email,
        //     subject: 'Ai Interviewer | Verification Code ',
        //     react: VerificationEmail({ username, verifycode })
        // });
        // console.log(emailSent);
        const emailHtml = await render(VerificationEmail({ username, verifycode }));
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verification Code for Email | SyntheView.ai ',
            html: emailHtml,
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
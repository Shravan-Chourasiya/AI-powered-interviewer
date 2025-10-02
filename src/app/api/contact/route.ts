import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, subject, message } = await req.json();
        
        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #14b8a6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                    <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">SyntheView AI Interviewer</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #374151; margin-top: 0;">Contact Details</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    
                    <h3 style="color: #374151; margin-top: 30px;">Message</h3>
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                        <p style="margin: 0; line-height: 1.6; color: #374151;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="color: #6b7280; font-size: 14px; margin: 0;">
                            This message was sent from the SyntheView contact form.<br>
                            Reply directly to this email to respond to ${firstName}.
                        </p>
                    </div>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'syntheview.ai@gmail.com',
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: emailHtml,
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
    }
}
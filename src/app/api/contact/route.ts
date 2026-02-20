import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return new NextResponse('All fields are required', { status: 400 });
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your app password
        },
    });

    const mailOptions = {
        from: email,
        to: 'fidelkm16@gmail.com',
        subject: `Contact Form Message from ${name}`,
        text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
        html: `
      <h3>New Contact Form Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    };

    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('Email credentials not found. Check your .env file.');
            // For development, we'll log the message and return success
            console.log('Faked Email Send (Preview):', mailOptions);
            return NextResponse.json({ message: 'Email credentials not set, but message received (preview in console).' }, { status: 200 });
        }

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return new NextResponse(error.message || 'Failed to send message', { status: 500 });
    }
}

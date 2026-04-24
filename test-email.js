const fs = require('fs');
const nodemailer = require('nodemailer');

const envLocal = fs.readFileSync('.env.local', 'utf8');
const env = {};
envLocal.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
        }
        env[match[1].trim()] = val;
    }
});

async function testEmail() {
    console.log('Testing email sender...');
    console.log('User:', env.EMAIL_USER);
    console.log('Pass:', env.EMAIL_PASS ? '********' : 'NOT SET');

    if (!env.EMAIL_USER || !env.EMAIL_PASS) {
        console.error('Missing EMAIL_USER or EMAIL_PASS in .env.local');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"G- Road Hotel" <' + env.EMAIL_USER + '>',
            to: env.EMAIL_USER, // send to self
            subject: 'Test Email Server',
            text: 'If you receive this, the email credentials are correct and working.',
        });
        console.log('Success! Email sent. MessageId:', info.messageId);
    } catch (err) {
        console.error('Failed to send email:', err);
    }
}

testEmail();

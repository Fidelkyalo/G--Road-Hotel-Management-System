import twilio from 'twilio';

// Initialize the Twilio client (lazy load to avoid errors if env vars are missing at build time)
let client: twilio.Twilio;

/**
 * Ensures the phone number is in E.164 format (+254...) for Twilio.
 */
const formatPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.slice(1);
    } else if (!cleaned.startsWith('254') && cleaned.length >= 9) {
        // Assuming mostly Kenyan numbers if they just typed 712345678
        cleaned = '254' + cleaned;
    }
    return `+${cleaned}`;
};

/**
 * Sends a booking confirmation via SMS and WhatsApp.
 */
export const sendBookingMessage = async (bookingDetails: {
    bookingStatusNumber: string;
    checkinDate: string;
    checkoutDate: string;
    totalPrice: number;
    roomId: string;
}) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // For SMS
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Default sandbox number

    if (!accountSid || !authToken || !twilioPhoneNumber) {
        console.error('Twilio credentials missing. Cannot send SMS/WhatsApp.');
        return false;
    }

    if (!client) {
        client = twilio(accountSid, authToken);
    }

    if (!bookingDetails.bookingStatusNumber) {
        console.error('No bookingStatusNumber provided.');
        return false;
    }

    const formattedNumber = formatPhoneNumber(bookingDetails.bookingStatusNumber);

    const checkinObj = new Date(bookingDetails.checkinDate);
    const checkoutObj = new Date(bookingDetails.checkoutDate);

    const checkinStr = checkinObj.toLocaleDateString('en-GB');
    const checkoutStr = checkoutObj.toLocaleDateString('en-GB');

    const messageBody = `Hello! Your G-Road Hotel booking is confirmed.\n\nDetails:\nCheck-in: ${checkinStr}\nCheck-out: ${checkoutStr}\nTotal Price: Ksh ${bookingDetails.totalPrice.toLocaleString()}\n\nThank you for choosing G-Road Hotel!`;

    try {
        console.log(`Sending SMS to ${formattedNumber}...`);
        await client.messages.create({
            body: messageBody,
            from: twilioPhoneNumber,
            to: formattedNumber,
        });

        console.log(`Sending WhatsApp to ${formattedNumber}...`);
        await client.messages.create({
            from: twilioWhatsAppNumber,
            to: `whatsapp:${formattedNumber}`,
            contentSid: 'HXb5b62575e6e4ff6129ad7cBefe1f983e',
            contentVariables: JSON.stringify({
                "1": checkinStr,
                "2": "12:00 PM"
            })
        });

        console.log('Successfully sent out Twilio SMS and WhatsApp notifications!');
        return true;
    } catch (error: any) {
        console.error('Error sending Twilio message:', error.message);
        return false;
    }
};

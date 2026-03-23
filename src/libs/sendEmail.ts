import nodemailer from 'nodemailer';
import { getUserData, getRoomById, updateBookingEmailStatus } from './apis';

export const sendBookingConfirmation = async ({
  userId,
  roomId,
  bookingId,
  checkinDate,
  checkoutDate,
  numberOfDays,
  adults,
  children,
  totalPrice,
  discount,
}: {
  userId: string;
  roomId: string;
  bookingId: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
}) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email credentials not configured. Skipping booking confirmation email.');
      return false;
    }

    // Fetch User and Room details
    const [user, room] = await Promise.all([
      getUserData(userId),
      getRoomById(roomId)
    ]);

    if (!user || (!user.email && !user.name)) {
      console.warn('User details missing. Cannot send confirmation email.');
      return false;
    }

    const clientEmail = user.email;
    const clientName = user.name || 'Guest';
    const roomName = room?.name || 'Hotel Room';
    const roomPrice = room?.price || 0;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: `G- Road Hotel <${process.env.EMAIL_USER}>`,
        to: clientEmail,
        subject: `Booking Confirmation: ${roomName} at G- Road Hotel`,
        text: `
          Dear ${clientName},
          
          Thank you for choosing G- Road Hotel! Your booking is confirmed.
          
          Booking Details:
          - Room: ${roomName}
          - Check-in Date: ${new Date(checkinDate).toLocaleDateString()}
          - Check-out Date: ${new Date(checkoutDate).toLocaleDateString()}
          - Duration: ${numberOfDays} Days
          - Guests: ${adults} Adults, ${children} Children
          
          Payment Summary:
          - Room Base Price: $${roomPrice} / night
          - Discount Applied: $${discount}
          - Total Paid: $${totalPrice}
          
          If you have any questions or need to modify your reservation, please reply to this email or contact us at +254 102 039 121.
          
          We look forward to hosting you!
          
          Warm regards,
          G- Road Hotel Management
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #4a5568;">Booking Confirmation</h2>
            <p>Dear ${clientName},</p>
            <p>Thank you for choosing <strong>G- Road Hotel</strong>! Your booking is successfully confirmed.</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2d3748;">Booking Details</h3>
              <p><strong>Room:</strong> ${roomName}</p>
              <p><strong>Check-in:</strong> ${new Date(checkinDate).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> ${new Date(checkoutDate).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> ${numberOfDays} Night(s)</p>
              <p><strong>Guests:</strong> ${adults} Adult(s), ${children} Child(ren)</p>
            </div>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2d3748;">Payment Summary</h3>
              <p><strong>Room Base Price:</strong> $${roomPrice} / night</p>
              <p><strong>Discount Applied:</strong> $${discount}</p>
              <p style="font-size: 1.2em; border-top: 1px solid #cbd5e0; padding-top: 10px; margin-top: 10px;">
                <strong>Total Paid:</strong> $${totalPrice}
              </p>
            </div>
            
            <p>If you have any questions or need to modify your reservation, please reply to this email or contact our support team at <strong>+254 102 039 121</strong>.</p>
            
            <p>We look forward to hosting you!</p>
            <br/>
            <p>Warm regards,<br/><strong>G- Road Hotel Management</strong></p>
          </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent: %s', info.messageId);

    // Update Sanity that email has been sent
    await updateBookingEmailStatus(bookingId);

    return true;
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    return false;
  }
};

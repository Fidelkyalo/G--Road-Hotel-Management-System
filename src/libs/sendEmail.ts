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
    console.log(`[Email] Starting dispatch for Booking: ${bookingId}`);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('[Email] CRITICAL: Missing EMAIL_USER or EMAIL_PASS in environment!');
      return false;
    }

    console.log("[Email] Fetching data for User and Room...");
    const [user, room] = await Promise.all([
      getUserData(userId),
      getRoomById(roomId)
    ]);

    if (!user) {
      console.error(`[Email] ERROR: User ${userId} not found in Sanity!`);
      return false;
    }

    if (!user.email) {
      console.error(`[Email] ERROR: User ${user.name} has no email address. Skipping email.`);
      return false;
    }

    console.log(`[Email] Sending to: ${user.email} for Room: ${room?.name || 'Unknown'}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `G- Road Hotel <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Booking Confirmation: ${room?.name || 'Hotel Room'} at G- Road Hotel`,
      text: `Your booking for ${room?.name} is confirmed for ${new Date(checkinDate).toLocaleDateString()}. Total: KES ${totalPrice}`,
      html: `<h2>Booking Confirmed</h2><p>Room: ${room?.name}</p><p>Check-in: ${new Date(checkinDate).toLocaleDateString()}</p><p>Total Paid: KES ${totalPrice}</p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('[Email] SUCCESS: Email sent! MessageId:', info.messageId);

      console.log("[Email] Updating Sanity status...");
      await updateBookingEmailStatus(bookingId);
      return true;
    } catch (mailError: any) {
      console.error("[Email] NODEMAILER ERROR:", mailError.message);
      return false;
    }
  } catch (error: any) {
    console.error("[Email] FATAL ERROR:", error.message);
    return false;
  }
};

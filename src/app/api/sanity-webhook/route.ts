import { NextResponse } from 'next/server';
import { sendBookingConfirmation } from '@/libs/sendEmail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { _id, _type, status, isEmailSent, user, hotelRoom, checkinDate, checkoutDate, numberOfDays, adults, children, totalPrice, discount } = body;

    // Only process booking documents where status is 'paid' and email hasn't been sent yet
    if (_type === 'booking' && status === 'paid' && isEmailSent === false) {
      console.log(`Processing auto-email for Booking ID: ${_id}`);

      const success = await sendBookingConfirmation({
        userId: user._ref || user, // Handle both object and string ref
        roomId: hotelRoom._ref || hotelRoom,
        bookingId: _id,
        checkinDate,
        checkoutDate,
        numberOfDays,
        adults,
        children,
        totalPrice,
        discount: discount || 0,
      });

      if (success) {
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'No action required' }, { status: 200 });
  } catch (error: any) {
    console.error('Sanity Webhook Error:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

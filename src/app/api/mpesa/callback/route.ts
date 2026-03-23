import { NextResponse } from 'next/server';

import { updateHotelRoom, updateBooking } from '@/libs/apis';
import sanityClient from '@/libs/sanity';
import { getBookingByCheckoutRequestId } from '@/libs/sanityQueries';
import { sendBookingConfirmation } from '@/libs/sendEmail';

export async function POST(req: Request) {
    const data = await req.json();

    if (!data.Body.stkCallback.CallbackMetadata) {
        console.log("M-Pesa Payment Failed or Cancelled");
        // Update booking to failed if needed, but we need CheckoutRequestID
        // data.Body.stkCallback.CheckoutRequestID is always present
        return NextResponse.json("Ok");
    }

    const { CheckoutRequestID, ResultCode } = data.Body.stkCallback;
    console.log("M-Pesa Callback Data:", JSON.stringify(data.Body.stkCallback));

    try {
        // 1. Find the pending booking
        const booking = await sanityClient.fetch(getBookingByCheckoutRequestId, {
            checkoutRequestId: CheckoutRequestID,
        });

        if (!booking) {
            console.error(`Booking with CheckoutRequestID ${CheckoutRequestID} not found.`);
            return NextResponse.json("Booking not found", { status: 404 });
        }

        // 2. Update status based on ResultCode
        if (ResultCode === 0) {
            // Success
            await updateBooking(booking._id, 'paid');

            if (booking.hotelRoom) {
                await updateHotelRoom(booking.hotelRoom);
            }

            // Send Email Confirmation
            await sendBookingConfirmation({
                userId: booking.user,
                roomId: booking.hotelRoom,
                bookingId: booking._id,
                checkinDate: booking.checkinDate,
                checkoutDate: booking.checkoutDate,
                numberOfDays: booking.numberOfDays,
                adults: booking.adults,
                children: booking.children,
                totalPrice: booking.totalPrice,
                discount: booking.discount || 0,
            });
        } else {
            // Failed
            await updateBooking(booking._id, 'failed');
        }

    } catch (error) {
        console.error("Error processing M-Pesa callback:", error);
        return NextResponse.json("Error", { status: 500 });
    }

    return NextResponse.json("Ok");
}

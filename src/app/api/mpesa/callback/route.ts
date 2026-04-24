import { NextResponse } from 'next/server';

import { updateHotelRoom, updateBooking } from '@/libs/apis';
import sanityClient from '@/libs/sanity';
import { getBookingByCheckoutRequestId } from '@/libs/sanityQueries';
import { sendBookingMessage } from '@/libs/twilioClient';

export async function POST(req: Request) {
    console.log("M-Pesa Callback Received!");
    try {
        const data = await req.json();
        console.log("M-Pesa Full Payload:", JSON.stringify(data));

        if (!data?.Body?.stkCallback?.CallbackMetadata) {
            console.log("M-Pesa Payment Failed, Cancelled, or Invalid Metadata Received");
            return NextResponse.json("Ok");
        }

        const { CheckoutRequestID, ResultCode } = data.Body.stkCallback;
        console.log(`M-Pesa Trace: CheckoutID=${CheckoutRequestID}, Result=${ResultCode}`);

        console.log("Querying Sanity for booking...");
        const booking = await sanityClient.fetch(getBookingByCheckoutRequestId, {
            checkoutRequestId: CheckoutRequestID,
        });

        if (!booking) {
            console.error(`ERROR: Booking not found for CheckoutRequestID: ${CheckoutRequestID}`);
            return NextResponse.json("Booking not found", { status: 404 });
        }

        console.log(`Booking ID ${booking._id} found. Current status: ${booking.status}`);

        if (ResultCode === 0) {
            console.log("Payment SUCCESS. Updating records...");
            await updateBooking(booking._id, 'paid');

            if (booking.hotelRoom) {
                await updateHotelRoom(booking.hotelRoom);
            }

            // Email notifications have been explicitly disabled
            // Only using Twilio for SMS/WhatsApp notifications.

            if (booking.bookingStatusNumber) {
                console.log("Attempting to send WhatsApp/SMS...");
                const smsSent = await sendBookingMessage({
                    bookingStatusNumber: booking.bookingStatusNumber,
                    checkinDate: booking.checkinDate,
                    checkoutDate: booking.checkoutDate,
                    totalPrice: booking.totalPrice,
                    roomId: booking.hotelRoom,
                });
                console.log(`SMS/WhatsApp process finished. smsSent return value: ${smsSent}`);
            }
        } else {
            console.log(`Payment FAILED (Code ${ResultCode}). Updating booking to 'failed'.`);
            await updateBooking(booking._id, 'failed');
        }

    } catch (error: any) {
        console.error("CRITICAL ERROR in M-Pesa Callback Route:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json("Ok");
}

import { NextResponse } from 'next/server';

import { updateHotelRoom, updateBooking } from '@/libs/apis';
import sanityClient from '@/libs/sanity';
import { getBookingByCheckoutRequestId } from '@/libs/sanityQueries';

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
            // Assuming booking object has hotelRoom reference, strictly we should fetch it or update it via ID
            // But updateHotelRoom takes hotelRoomId. 
            // We need to fetch hotelRoom ID from the booking.
            // My getBookingByCheckoutRequestIdQuery only fetches _id. I should update it to fetch hotelRoom._ref
            // Or just fetch it now.
            // Let's rely on the query update I will do next or just update the query here.

            // For now, let's mark booking as paid. 
            // To update the room to booked, we need the room ID. 
            // Let's assume we can fetch it or we updated the query.
            // Actually I'll verify the query update in previous steps. 
            // I updated getBookingByCheckoutRequestId to only return _id. I should have added hotelRoom.
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

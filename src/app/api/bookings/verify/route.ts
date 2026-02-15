import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';
import { updateBooking, updateHotelRoom } from '@/libs/apis';
import sanityClient from '@/libs/sanity';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Authentication Required', { status: 401 });
    }

    const { bookingId } = await req.json();

    if (!bookingId) {
        return new NextResponse('Booking ID Required', { status: 400 });
    }

    try {
        // Fetch booking to get room reference
        const booking = await sanityClient.fetch(
            `*[_type == "booking" && _id == $bookingId][0] {
                _id,
                hotelRoom -> {
                    _id
                }
            }`,
            { bookingId }
        );

        if (!booking) {
            return new NextResponse('Booking not found', { status: 404 });
        }

        // 1. Update booking status to paid
        await updateBooking(bookingId, 'paid');

        // 2. Mark hotel room as booked
        await updateHotelRoom(booking.hotelRoom._id);

        return NextResponse.json({ message: 'Payment verified manually' }, { status: 200 });
    } catch (error: any) {
        console.error('Error verifying booking:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

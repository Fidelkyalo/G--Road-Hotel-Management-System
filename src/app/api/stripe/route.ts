import Stripe from 'stripe';

import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getRoom } from '@/libs/apis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
}) as any;

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

/**
 * Handles Stripe payment session creation.
 * @param {Request} req - The income request object containing booking details.
 * @param {Response} res - The response object.
 * @returns {Promise<NextResponse>} JSON response with the Stripe session.
 */
export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();

  console.log('Processing Stripe Payment Request..');

  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse('Please all fields are required', { status: 400 });
  }

  const origin = req.headers.get('origin');

  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication required', { status: 400 });
  }

  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split('T')[0];
  const formattedCheckinDate = checkinDate.split('T')[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // Create a stripe payment
    console.log('Creating Stripe Session...');
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'kes',
            product_data: {
              name: room.name,
              images: room.images.map(image => image.url),
            },
            unit_amount: Math.round(totalPrice * 100),
          },
        },
      ],
      payment_method_types: ['card', 'mpesa'],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults: adults.toString(),
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        children: children.toString(),
        hotelRoom: room._id,
        numberOfDays: numberOfDays.toString(),
        user: userId,
        discount: room.discount.toString(),
        totalPrice: totalPrice.toString(),
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    console.error('Payment failed details:', {
      message: error.message,
      type: error.type,
      raw: error.raw,
      stack: error.stack,
    });
    return new NextResponse(error.message || 'Payment initiation failed', { status: 500 });
  }
}

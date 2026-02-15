import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/libs/auth';
import {
  checkReviewExists,
  checkUserHasBooking,
  createReview,
  getUserData,
  updateReview,
} from '@/libs/apis';

/**
 * Fetches current user data.
 * Requires authentication.
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object.
 * @returns {Promise<NextResponse>} JSON response with user data.
 */
export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

/**
 * Creates or updates a room review.
 * Requires authentication.
 * @param {Request} req - The incoming request object containing review details.
 * @param {Response} res - The response object.
 * @returns {Promise<NextResponse>} JSON response with the created/updated review.
 */
export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse('All fields are required', { status: 400 });
  }

  const userId = session.user.id;

  try {
    const hasBooking = await checkUserHasBooking(userId, roomId);

    if (!hasBooking) {
      return new NextResponse('You must have a booking to rate this room', {
        status: 403,
      });
    }

    const alreadyExists = await checkReviewExists(userId, roomId);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error: any) {
    console.log('Error Updating', error);
    return new NextResponse('Unable to create review', { status: 400 });
  }
}

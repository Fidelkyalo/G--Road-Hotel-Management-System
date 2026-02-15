import { getRoomReviews } from '@/libs/apis';
import { NextResponse } from 'next/server';

/**
 * Fetches reviews for a specific room.
 * @param {Request} req - The incoming request object.
 * @param {Object} params - Route parameters.
 * @param {string} params.id - The room ID.
 * @returns {Promise<NextResponse>} JSON response with the room reviews.
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const roomId = params.id;

  try {
    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: 'Succesful',
    });
  } catch (error) {
    console.log('Getting Review Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

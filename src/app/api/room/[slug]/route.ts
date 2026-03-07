import { getRoom } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    console.log(`API Route: Fetching room for slug: ${slug}`);

    try {
        const room = await getRoom(slug);
        if (!room) {
            return new NextResponse('Room not found', { status: 404 });
        }

        return NextResponse.json(room, {
            status: 200,
            statusText: 'Successful',
        });
    } catch (error) {
        console.error('API Route Error fetching room:', error);
        return new NextResponse('Unable to fetch', { status: 400 });
    }
}

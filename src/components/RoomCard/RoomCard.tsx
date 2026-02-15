import { FC } from 'react';
import Image from 'next/image';

import { Room } from '@/models/room';
import Link from 'next/link';
import { urlFor } from '@/libs/sanity';

/**
 * Props for the RoomCard component.
 */
type Props = {
  room: Room;
};

/**
 * RoomCard component displaying individual room details.
 * @param {Props} props - Component props containing the room data.
 * @returns {JSX.Element} The rendered RoomCard component.
 */
const RoomCard: FC<Props> = props => {
  const {
    room: { coverImage, name, price, type, description, slug, isBooked, coverImageSanity },
  } = props;

  const imageUrl = coverImageSanity
    ? urlFor(coverImageSanity).width(500).height(500).url()
    : coverImage?.url || '/images/placeholder.jpg';

  return (
    <div className='rounded-xl w-full max-w-[320px] mb-10 mx-auto md:mx-0 overflow-hidden text-black shadow-md hover:shadow-xl transition-all duration-300'>
      <div className='h-60 overflow-hidden'>
        <Image
          src={imageUrl}
          alt={name}
          width={250}
          height={250}
          className='img scale-animation'
        />
      </div>

      <div className='p-4 bg-white'>
        <div className='flex justify-between text-xl font-semibold'>
          <p>{name}</p>
          <p>Ksh {price.toLocaleString()}</p>
        </div>

        <p className='pt-2 text-xs'>{type} Room</p>

        <p className='pt-3 pb-6'>{description.slice(1, 100)}...</p>

        <Link
          href={`/rooms/${slug.current}`}
          className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
        >
          {isBooked ? 'BOOKED' : 'BOOK NOW'}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
